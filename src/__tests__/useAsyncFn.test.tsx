// NOTE: most behavior that useAsyncFn provides
//       is covered be the useAsync tests.
//
// The main difference is that useAsyncFn
// does not automatically invoke the function
// and it can take arguments.

import { renderHook } from '@testing-library/react-hooks';
import useAsyncFn, { AsyncState } from '../useAsyncFn';

type AdderFn = (a: number, b: number) => Promise<number>;

describe('useAsyncFn', () => {
  it('should be defined', () => {
    expect(useAsyncFn).toBeDefined();
  });

  describe('the callback can be awaited and return the value', () => {
    let hook;
    let callCount = 0;
    const adder = async (a: number, b: number): Promise<number> => {
      callCount++;
      return a + b;
    };

    beforeEach(() => {
      // NOTE: renderHook isn't good at inferring array types
      hook = renderHook<{ fn: AdderFn }, [AsyncState<number>, AdderFn]>(({ fn }) => useAsyncFn(fn), {
        initialProps: {
          fn: adder,
        },
      });
    });

    it('awaits the result', async () => {
      expect.assertions(3);

      const [s, callback] = hook.result.current;

      const result = await callback(5, 7);

      expect(result).toEqual(12);

      const [state] = hook.result.current;

      expect(state.value).toEqual(12);
      expect(result).toEqual(state.value);
    });
  });

  describe('args can be passed to the function', () => {
    let hook;
    let callCount = 0;
    const adder = async (a: number, b: number): Promise<number> => {
      callCount++;
      return a + b;
    };

    beforeEach(() => {
      // NOTE: renderHook isn't good at inferring array types
      hook = renderHook<{ fn: AdderFn }, [AsyncState<number>, AdderFn]>(({ fn }) => useAsyncFn(fn), {
        initialProps: {
          fn: adder,
        },
      });
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

        const [s, callback] = hook.result.current;

        callback(2, 7);
        hook.rerender({ fn: adder });
        await hook.waitForNextUpdate();

        const [state, c] = hook.result.current;

        expect(callCount).toEqual(1);
        expect(state.loading).toEqual(false);
        expect(state.error).toEqual(undefined);
        expect(state.value).toEqual(9);
      });
    });
  });
});
