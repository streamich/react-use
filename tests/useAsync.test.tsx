import { renderHook } from '@testing-library/react-hooks';
import { useCallback } from 'react';
import useAsync from '../src/useAsync';

describe('useAsync', () => {
  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

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
      expect(hook.result.current.loading).toBe(true);
      await hook.waitForNextUpdate();
    });

    it('resolves', async () => {
      expect.assertions(4);

      hook.rerender({ fn: resolver });
      await hook.waitForNextUpdate();

      expect(callCount).toBe(1);
      expect(hook.result.current.loading).toBeFalsy();
      expect(hook.result.current.value).toBe('yay');
      expect(hook.result.current.error).toBe(undefined);
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

      expect(callCount).toBe(1);
      expect(hook.result.current.loading).toBeFalsy();
      expect(hook.result.current.error).toBe('yay');
      expect(hook.result.current.value).toBe(undefined);
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
        expect(hook.result.current.value).toBe('value');
      });

      it('renders a different value when deps change', async () => {
        expect.assertions(3);

        expect(callCount).toBe(1);

        hook.rerender({ fn: differentFn }); // change the fn to initiate new request
        await hook.waitForNextUpdate();

        expect(callCount).toBe(2);
        expect(hook.result.current.value).toBe('new value');
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
        expect(hook.result.current.value).toBe('counter is 0 and callCount is 1');
      });

      it('renders a different value when deps change', async () => {
        expect.assertions(1);

        hook.rerender({ fn: staticFunction, counter: 1 });
        await hook.waitForNextUpdate();

        expect(hook.result.current.value).toBe('counter is 1 and callCount is 2');
      });
    });
  });
});
