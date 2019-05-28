import { cleanup, renderHook } from 'react-hooks-testing-library';
import useAsync from '../useAsync';

afterEach(cleanup);

function wait(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

describe('useAsync', () => {
  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  describe('a success', () => {
    const hook = renderHook(props => useAsync(props), {
      initialProps: () =>
        new Promise((resolve, reject) => {
          setTimeout(() => resolve('yay'), 50);
        }),
    });

    it('initially starts loading', () => {
      expect(hook.result.current.loading).toEqual(true);
    });

    it('resolves', async () => {
      await wait(60);
      expect(hook.result.current.loading).toEqual(false);
      expect(hook.result.current.value).toEqual('yay');
      expect(hook.result.current.error).toEqual(undefined);
    });
  });

  describe('an error', () => {
    const hook = renderHook(props => useAsync(props), {
      initialProps: () =>
        new Promise((resolve, reject) => {
          setTimeout(() => reject('yay'), 50);
        }),
    });

    it('initially starts loading', () => {
      expect(hook.result.current.loading).toEqual(true);
    });

    it('resolves', async () => {
      await wait(60);
      expect(hook.result.current.loading).toEqual(false);
      expect(hook.result.current.error).toEqual('yay');
      expect(hook.result.current.value).toEqual(undefined);
    });
  });
});
