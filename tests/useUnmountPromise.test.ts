import { renderHook } from '@testing-library/react-hooks';
import useUnmountPromise from '../src/useUnmountPromise';

describe('useUnmountPromise', () => {
  it('should be defined', () => {
    expect(useUnmountPromise).toBeDefined();
  });

  it('should return a function', () => {
    const hook = renderHook(() => useUnmountPromise());

    expect(typeof hook.result.current).toBe('function');
  });

  it('when component is mounted function should resolve with wrapped promises', async () => {
    const hook = renderHook(() => useUnmountPromise());

    const mounted = hook.result.current;
    const res = await mounted(new Promise((r) => setTimeout(() => r(25), 10)));

    expect(res).toBe(25);
  });

  it('when component is unmounted promise never resolves', async () => {
    const hook = renderHook(() => useUnmountPromise());

    const mounted = hook.result.current;
    const promise = mounted(new Promise((r) => setTimeout(() => r(25), 10)));

    hook.unmount();

    const res = await Promise.race([
      promise,
      new Promise((r) => setTimeout(() => r('UNMOUNTED'), 20)),
    ]);
    expect(res).toBe('UNMOUNTED');
  });

  it('should resolve promise when component is updated', async () => {
    const hook = renderHook(() => useUnmountPromise());

    const mounted = hook.result.current;
    const pRes = mounted(new Promise((r) => setTimeout(() => r(25), 10)));

    hook.rerender();

    const res = await pRes;

    expect(res).toBe(25);
  });

  it('when component is mounted function should resolve with wrapped promises - 2', async () => {
    const hook = renderHook(() => useUnmountPromise());

    const mounted = hook.result.current;
    const promise = mounted(new Promise((r) => setTimeout(() => r(25), 10)));

    // hook.unmount();

    const res = await Promise.race([
      promise,
      new Promise((r) => setTimeout(() => r('UNMOUNTED'), 20)),
    ]);
    expect(res).toBe(25);
  });

  describe('when promise throws', () => {
    describe('when component is mounted', () => {
      it('onError callback is not called', async () => {
        const hook = renderHook(() => useUnmountPromise());

        const mounted = hook.result.current;
        const onError = jest.fn();
        try {
          await mounted(new Promise((r, reject) => setTimeout(() => reject(r), 10)), onError);
        } catch {}

        expect(onError).toHaveBeenCalledTimes(0);
      });
    });

    describe('when component is un-mounted', () => {
      it('onError callback is called', async () => {
        const hook = renderHook(() => useUnmountPromise());

        const mounted = hook.result.current;
        const onError = jest.fn();
        const promise = mounted(
          new Promise((r, reject) => setTimeout(() => reject(r), 10)),
          onError
        );

        hook.unmount();
        await Promise.race([promise, new Promise((r) => setTimeout(r, 20))]);

        expect(onError).toHaveBeenCalledTimes(1);
        expect(typeof onError.mock.calls[0][0]).toBe('function');
      });
    });
  });
});
