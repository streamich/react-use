import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import useAsyncRetry from '../src/useAsyncRetry';

describe('useAsyncRetry', () => {
  it('should be defined', () => {
    expect(useAsyncRetry).toBeDefined();
  });

  describe('success with retry', () => {
    let hook;
    let callCount = 0;

    const resolver = async () => {
      return new Promise((resolve) => {
        callCount++;

        const wait = setTimeout(() => {
          clearTimeout(wait);
          resolve(`result-${callCount}`);
        }, 0);
      });
    };

    beforeEach(() => {
      callCount = 0;
      hook = renderHook(({ fn }) => useAsyncRetry(fn, [fn]), {
        initialProps: {
          fn: resolver,
        },
      });
    });

    it('initially starts loading', async () => {
      expect(hook.result.current.loading).toEqual(true);
      await hook.waitForNextUpdate();
    });

    it('resolves and retries', async () => {
      expect.assertions(8);

      hook.rerender({ fn: resolver });
      await hook.waitForNextUpdate();

      expect(callCount).toEqual(1);
      expect(hook.result.current.loading).toBeFalsy();
      expect(hook.result.current.value).toEqual('result-1');
      expect(hook.result.current.error).toEqual(undefined);

      act(() => {
        hook.result.current.retry();
      });

      await hook.waitForNextUpdate();

      expect(callCount).toEqual(2);
      expect(hook.result.current.loading).toBeFalsy();
      expect(hook.result.current.value).toEqual('result-2');
      expect(hook.result.current.error).toEqual(undefined);
    });
  });
});
