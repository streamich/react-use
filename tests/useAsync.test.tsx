import { renderHook, RenderHookResult, waitFor } from '@testing-library/react';
import { useCallback } from 'react';
import useAsync from '../src/useAsync';

describe('useAsync', () => {
  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  describe('a success', () => {
    let hook: RenderHookResult<ReturnType<typeof useAsync>, { fn: () => Promise<string> }>;
    let callCount = 0;

    const resolver = async () => {
      return new Promise<string>((resolve) => {
        callCount++;

        const wait = setTimeout(() => {
          clearTimeout(wait);
          resolve('yay');
        }, 0);
      });
    };

    beforeEach(() => {
      callCount = 0;
      hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
        initialProps: {
          fn: resolver,
        },
      });
    });

    it('initially starts loading', async () => {
      expect(hook.result.current.loading).toEqual(true);
    });

    it('resolves', async () => {
      hook.rerender({ fn: resolver });
      await waitFor(() => {
        expect(callCount).toEqual(1);
        expect(hook.result.current.loading).toBeFalsy();
      });

      expect(hook.result.current.value).toEqual('yay');
      expect(hook.result.current.error).toEqual(undefined);
    });
  });

  describe('an error', () => {
    let hook: RenderHookResult<ReturnType<typeof useAsync>, { fn: () => Promise<never> }>;
    let callCount = 0;

    const rejection = async () => {
      return new Promise<never>((_, reject) => {
        callCount++;

        const wait = setTimeout(() => {
          clearTimeout(wait);
          reject('yay');
        }, 0);
      });
    };

    beforeEach(() => {
      callCount = 0;
      hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
        initialProps: {
          fn: rejection,
        },
      });
    });

    it('initially starts loading', async () => {
      expect(hook.result.current.loading).toBeTruthy();
    });

    it('resolves', async () => {
      hook.rerender({ fn: rejection });
      await waitFor(() => {
        expect(callCount).toEqual(1);
        expect(hook.result.current.loading).toBeFalsy();
      });

      expect(hook.result.current.error).toEqual('yay');
      expect(hook.result.current.value).toEqual(undefined);
    });
  });

  describe('re-evaluates when dependencies change', () => {
    describe('the fn is a dependency', () => {
      let hook: RenderHookResult<ReturnType<typeof useAsync>, { fn: () => Promise<string> }>;
      let callCount = 0;

      const initialFn = async () => {
        callCount++;
        return 'value';
      };

      const differentFn = async () => {
        callCount++;
        return 'new value';
      };

      beforeEach(async () => {
        callCount = 0;

        hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
          initialProps: { fn: initialFn },
        });

        await waitFor(() => {
          expect(callCount).toEqual(1);
        });
      });

      it('renders the first value', () => {
        expect(hook.result.current.value).toEqual('value');
      });

      it('renders a different value when deps change', async () => {
        expect(callCount).toEqual(1);

        hook.rerender({ fn: differentFn }); // change the fn to initiate new request
        await waitFor(() => {
          expect(callCount).toEqual(2);
        });

        expect(hook.result.current.value).toEqual('new value');
      });
    });

    describe('the additional dependencies list changes', () => {
      let callCount = 0;
      let hook: RenderHookResult<
        ReturnType<typeof useAsync>,
        { fn: (counter: number) => Promise<string>; counter: number }
      >;

      const staticFunction = async (counter) => {
        callCount++;
        return `counter is ${counter} and callCount is ${callCount}`;
      };

      beforeEach(async () => {
        callCount = 0;
        hook = renderHook(
          ({ fn, counter }) => {
            const callback = useCallback(() => fn(counter), [counter]);
            return useAsync<any>(callback, [callback]);
          },
          {
            initialProps: {
              counter: 0,
              fn: staticFunction,
            },
          }
        );
        await waitFor(() => {
          expect(callCount).toEqual(1);
        });
      });

      it('initial renders the first passed pargs', () => {
        expect(hook.result.current.value).toEqual('counter is 0 and callCount is 1');
      });

      it('renders a different value when deps change', async () => {
        hook.rerender({ fn: staticFunction, counter: 1 });
        await waitFor(() => {
          expect(callCount).toEqual(2);
        });

        expect(hook.result.current.value).toEqual('counter is 1 and callCount is 2');
      });
    });
  });
});
