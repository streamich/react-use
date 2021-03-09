// NOTE: most behavior that useAsyncFn provides
//       is covered be the useAsync tests.
//
// The main difference is that useAsyncFn
// does not automatically invoke the function
// and it can take arguments.

import { act, renderHook } from '@testing-library/react-hooks';
import useAsyncFn, { AsyncState } from '../src/useAsyncFn';

type AdderFn = (a?: number, b?: number) => Promise<number>;

describe('useAsyncFn', () => {
  it('should be defined', () => {
    expect(useAsyncFn).toBeDefined();
  });

  describe('the callback can be awaited and return the value', () => {
    let hook;
    const adder: AdderFn = async (a?: number, b?: number): Promise<number> => {
      return (a || 0) + (b || 0);
    };

    beforeEach(() => {
      // NOTE: renderHook isn't good at inferring array types
      hook = renderHook<{ fn: AdderFn }, [AsyncState<number>, AdderFn]>(
        ({ fn }) => useAsyncFn(fn),
        {
          initialProps: { fn: adder },
        }
      );
    });

    it('awaits the result', async () => {
      expect.assertions(3);

      const [, callback] = hook.result.current;
      let result;

      await act(async () => {
        result = await callback(5, 7);
      });

      expect(result).toEqual(12);

      const [state] = hook.result.current;

      expect(state.value).toEqual(12);
      expect(result).toEqual(state.value);
    });
  });

  describe('args can be passed to the function', () => {
    let hook;
    let callCount = 0;
    const adder = async (a?: number, b?: number): Promise<number> => {
      callCount++;
      return (a || 0) + (b || 0);
    };

    beforeEach(() => {
      // NOTE: renderHook isn't good at inferring array types
      hook = renderHook<{ fn: AdderFn }, [AsyncState<number>, AdderFn]>(
        ({ fn }) => useAsyncFn(fn),
        {
          initialProps: {
            fn: adder,
          },
        }
      );
    });

    it('initially does not have a value', () => {
      const [state] = hook.result.current;

      expect(state.value).toEqual(undefined);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(undefined);
      expect(callCount).toEqual(0);
    });

    describe('when invoked', () => {
      it('resolves a value derived from args', async () => {
        expect.assertions(4);

        const [, callback] = hook.result.current;

        act(() => {
          callback(2, 7);
        });
        hook.rerender({ fn: adder });
        await hook.waitForNextUpdate();

        const [state] = hook.result.current;

        expect(callCount).toEqual(1);
        expect(state.loading).toEqual(false);
        expect(state.error).toEqual(undefined);
        expect(state.value).toEqual(9);
      });
    });
  });

  it('should only consider last call and discard previous ones', async () => {
    const queuedPromises: { id: number; resolve: () => void }[] = [];
    const delayedFunction1 = () => {
      return new Promise<number>((resolve) =>
        queuedPromises.push({ id: 1, resolve: () => resolve(1) })
      );
    };
    const delayedFunction2 = () => {
      return new Promise<number>((resolve) =>
        queuedPromises.push({ id: 2, resolve: () => resolve(2) })
      );
    };

    const hook = renderHook<
      { fn: () => Promise<number> },
      [AsyncState<number>, () => Promise<number>]
    >(({ fn }) => useAsyncFn(fn, [fn]), {
      initialProps: { fn: delayedFunction1 },
    });
    act(() => {
      hook.result.current[1](); // invoke 1st callback
    });

    hook.rerender({ fn: delayedFunction2 });
    act(() => {
      hook.result.current[1](); // invoke 2nd callback
    });

    act(() => {
      queuedPromises[1].resolve();
      queuedPromises[0].resolve();
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current[0]).toEqual({ loading: false, value: 2 });
  });

  it('should keeping value of initialState when loading', async () => {
    const fetch = async () => 'new state';
    const initialState = { loading: false, value: 'init state' };

    const hook = renderHook<
      { fn: () => Promise<string> },
      [AsyncState<string>, () => Promise<string>]
    >(({ fn }) => useAsyncFn(fn, [fn], initialState), {
      initialProps: { fn: fetch },
    });

    const [state, callback] = hook.result.current;
    expect(state.loading).toBe(false);
    expect(state.value).toBe('init state');

    act(() => {
      callback();
    });

    expect(hook.result.current[0].loading).toBe(true);
    expect(hook.result.current[0].value).toBe('init state');

    await hook.waitForNextUpdate();
    expect(hook.result.current[0].loading).toBe(false);
    expect(hook.result.current[0].value).toBe('new state');
  });
});
