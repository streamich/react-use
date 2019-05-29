import { useCallback } from 'react';
import { cleanup, renderHook } from 'react-hooks-testing-library';
import useAsync from '../useAsync';

afterEach(cleanup);

// NOTE: these tests cause console errors.
//       maybe we should test in a real environment instead
//       of a fake one?
describe('useAsync', () => {
  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  describe('a success', () => {
    const hook = renderHook(({ fn }) => useAsync(fn), {
      initialProps: {
        fn: async () => {
          return new Promise((resolve, reject) => {
            const wait = setTimeout(() => {
              clearTimeout(wait);
              resolve('yay');
            }, 0);
          });
        },
      },
    });

    it('initially starts loading', () => {
      expect(hook.result.current.loading).toEqual(true);
    });

    it('resolves', async () => {
      expect.assertions(3);

      hook.rerender();
      await hook.waitForNextUpdate();
      expect(hook.result.current.loading).toBeFalsy();
      expect(hook.result.current.value).toEqual('yay');
      expect(hook.result.current.error).toEqual(undefined);
    });
  });

  describe('an error', () => {
    const hook = renderHook(({ fn }) => useAsync(fn), {
      initialProps: {
        fn: async () => {
          return new Promise((resolve, reject) => {
            const wait = setTimeout(() => {
              clearTimeout(wait);
              reject('yay');
            }, 0);
          });
        },
      },
    });

    it('initially starts loading', () => {
      expect(hook.result.current.loading).toBeTruthy();
    });

    it('resolves', async () => {
      expect.assertions(3);

      hook.rerender();
      await hook.waitForNextUpdate();

      expect(hook.result.current.loading).toBeFalsy();
      expect(hook.result.current.error).toEqual('yay');
      expect(hook.result.current.value).toEqual(undefined);
    });
  });

  describe('re-evaluates when dependecies change', () => {
    describe('the fn is a dependency', () => {
      const hook = renderHook(({ fn }) => useAsync<string>(fn, []), {
        initialProps: {
          fn: async () => {
            return 'value';
          },
        },
      });

      it('renders the first value', () => {
        expect(hook.result.current.value).toEqual('value');
      });

      it('renders a different value when deps change', async () => {
        expect.assertions(1);

        hook.rerender({ fn: async () => 'new value' });
        await hook.waitForNextUpdate();

        expect(hook.result.current.value).toEqual('new value');
      });
    });

    describe('the additional dependencies list changes', () => {
      let callCount = 0;
      const staticFunction = async counter => {
        callCount++;
        return `counter is ${counter} and callCount is ${callCount}`;
      };
      const hook = renderHook(
        ({ fn, counter }) => {
          const callback = useCallback(() => fn(counter), [counter]);
          return useAsync<string>(callback, [callback]);
        },
        {
          initialProps: {
            counter: 0,
            fn: staticFunction,
          },
        }
      );

      it('initial renders the first passed pargs', () => {
        expect(hook.result.current.value).toEqual('counter is 0 and callCount is 1');
      });

      it('renders a different value when deps change', async () => {
        expect.assertions(1);

        hook.rerender({ fn: staticFunction, counter: 1 });
        await hook.waitForNextUpdate();

        expect(hook.result.current.value).toEqual('counter is 1 and callCount is 2');
      });
    });
  });
});
