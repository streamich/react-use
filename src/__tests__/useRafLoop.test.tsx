import { act, renderHook } from '@testing-library/react-hooks';
import useRafLoop from '../useRafLoop';

describe('useRafLoop', () => {
  it('should be defined', () => {
    expect(useRafLoop).toBeDefined();
  });

  it('should call a callback constantly inside the raf loop', done => {
    let calls = 0;
    const spy = () => calls++;
    renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(calls).toEqual(0);

    setTimeout(() => {
      expect(calls).toBeGreaterThanOrEqual(2);

      done();
    }, 120);
  });

  it('should return stop function, start function and loop state', () => {
    const hook = renderHook(() => useRafLoop(() => false), { initialProps: false });

    expect(typeof hook.result.current[0]).toEqual('function');
    expect(typeof hook.result.current[1]).toEqual('boolean');
    expect(typeof hook.result.current[2]).toEqual('function');
  });

  it('first element call should stop the loop', done => {
    let calls = 0;
    const spy = () => calls++;
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    // stop the loop
    act(() => {
      hook.result.current[0]();
    });

    setTimeout(() => {
      expect(calls).toEqual(0);

      done();
    }, 50);
  });

  it('second element should represent loop state', done => {
    let calls = 0;
    const spy = () => calls++;
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(hook.result.current[1]).toBe(true);

    // stop the loop
    act(() => {
      hook.result.current[0]();
    });

    expect(hook.result.current[1]).toBe(false);
    setTimeout(() => {
      expect(calls).toEqual(0);

      done();
    }, 120);
  });

  it('third element call should restart loop', done => {
    let calls = 0;
    const spy = () => calls++;
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(hook.result.current[1]).toBe(true);

    // stop the loop
    act(() => {
      hook.result.current[0]();
    });

    setTimeout(() => {
      expect(hook.result.current[1]).toBe(false);
      expect(calls).toEqual(0);

      // start the loop
      act(() => {
        hook.result.current[2]();
      });

      setTimeout(() => {
        expect(hook.result.current[1]).toBe(true);
        expect(calls).toBeGreaterThanOrEqual(2);

        done();
      }, 120);
    }, 50);
  });

  it('loop should stop itself on unmount', done => {
    let calls = 0;
    const spy = () => calls++;
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    hook.unmount();

    setTimeout(() => {
      expect(calls).toEqual(0);

      done();
    }, 50);
  });
});
