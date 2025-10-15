import { renderHook } from '@testing-library/react-hooks';
import { useCallback } from 'react';
import useAsync from '../src/useAsync';

describe('useAsync', () => {
  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });
  
  describe('Correct behaviour with syncronous functions', () => {
    it('Returns sync on first mount', async () => {
      /** Initially, return sync: */
      const initialFn = jest.fn().mockReturnValue('sync-return')

      const hook = renderHook(({ fn, deps }) => useAsync(fn, deps), {
        initialProps: {
          fn: initialFn,
          deps: [initialFn],
        },
      })

      /** Should be loaded, with value already present: */
      expect(hook.result.current.loading).toEqual(false)
      expect(hook.result.current.value).toEqual('sync-return')
      expect(initialFn).toBeCalledTimes(1)

      /** Now, change the deps & refresh the fn reference.
       *  Make sure the new function is called, not the old one
       */
      const newFunction = jest.fn().mockReturnValue('sync-return-2')
      hook.rerender({ fn: newFunction, deps: [newFunction] })
      /** Note: we don't await  here, because the fn is syncronous */

      expect(hook.result.current.loading).toEqual(false)
      expect(hook.result.current.value).toEqual('sync-return-2')
      expect(initialFn).toBeCalledTimes(1)
      expect(newFunction).toBeCalledTimes(1)

      /** Now change to a async function */
      const asyncFunction = jest.fn().mockResolvedValue('async-return-3')
      hook.rerender({ fn: asyncFunction, deps: [asyncFunction] })

      /** Before awaiting the result, assert the results: */
      expect(hook.result.current.loading).toEqual(true)
      expect(hook.result.current.value).toEqual(undefined)
      expect(initialFn).toBeCalledTimes(1)
      expect(newFunction).toBeCalledTimes(1)
      expect(newFunction).toBeCalledTimes(1)

      /** Now await & check the output: */
      await hook.waitForNextUpdate()
      expect(hook.result.current.loading).toEqual(false)
      expect(hook.result.current.value).toEqual('async-return-3')
      expect(initialFn).toBeCalledTimes(1)
      expect(newFunction).toBeCalledTimes(1)
      expect(newFunction).toBeCalledTimes(1)

      /** Now change to a sync function that throws an error: */
      const err = new Error('test-error')
      const syncThrowingFn = jest.fn().mockImplementation(() => {
        throw err
      })
      hook.rerender({ fn: syncThrowingFn, deps: [syncThrowingFn] })
      /** Note: we don't await  here, because the fn is syncronous */

      expect(hook.result.current.loading).toEqual(false)
      expect(hook.result.current.value).toEqual(undefined)
      expect(hook.result.current.error).toEqual(err)
    })
  })

  describe('a success', () => {
    let hook;
    let callCount = 0;

    const resolver = async () => {
      return new Promise((resolve) => {
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
      await hook.waitForNextUpdate();
    });

    it('resolves', async () => {
      expect.assertions(4);

      hook.rerender({ fn: resolver });
      await hook.waitForNextUpdate();

      expect(callCount).toEqual(1);
      expect(hook.result.current.loading).toBeFalsy();
      expect(hook.result.current.value).toEqual('yay');
      expect(hook.result.current.error).toEqual(undefined);
    });
  });

  describe('an error', () => {
    let hook;
    let callCount = 0;

    const rejection = async () => {
      return new Promise((_, reject) => {
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
      await hook.waitForNextUpdate();
    });

    it('resolves', async () => {
      expect.assertions(4);

      hook.rerender({ fn: rejection });
      await hook.waitForNextUpdate();

      expect(callCount).toEqual(1);
      expect(hook.result.current.loading).toBeFalsy();
      expect(hook.result.current.error).toEqual('yay');
      expect(hook.result.current.value).toEqual(undefined);
    });
  });

  describe('re-evaluates when dependencies change', () => {
    describe('the fn is a dependency', () => {
      let hook;
      let callCount = 0;

      const initialFn = async () => {
        callCount++;
        return 'value';
      };

      const differentFn = async () => {
        callCount++;
        return 'new value';
      };

      beforeEach((done) => {
        callCount = 0;

        hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
          initialProps: { fn: initialFn },
        });

        hook.waitForNextUpdate().then(done);
      });

      it('renders the first value', () => {
        expect(hook.result.current.value).toEqual('value');
      });

      it('renders a different value when deps change', async () => {
        expect.assertions(3);

        expect(callCount).toEqual(1);

        hook.rerender({ fn: differentFn }); // change the fn to initiate new request
        await hook.waitForNextUpdate();

        expect(callCount).toEqual(2);
        expect(hook.result.current.value).toEqual('new value');
      });
    });

    describe('the additional dependencies list changes', () => {
      let callCount = 0;
      let hook;

      const staticFunction = async (counter) => {
        callCount++;
        return `counter is ${counter} and callCount is ${callCount}`;
      };

      beforeEach((done) => {
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

        hook.waitForNextUpdate().then(done);
      });

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
