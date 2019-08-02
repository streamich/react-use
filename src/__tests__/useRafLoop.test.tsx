import { act, renderHook } from 'react-hooks-testing-library';
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
      expect(calls).toBeGreaterThanOrEqual(5);
      expect(calls).toBeLessThan(10);

      done();
    }, 100);
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
    }, 100);
  });

  it('second element should represent loop state', done => {
    let calls = 0;
    const spy = () => calls++;
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(hook.result.current[1]).toBeTruthy();

    // stop the loop
    act(() => {
      hook.result.current[0]();
    });

    expect(hook.result.current[1]).toBeFalsy();
    setTimeout(() => {
      expect(calls).toEqual(0);

      done();
    }, 100);
  });

  it('third element call should restart loop', done => {
    let calls = 0;
    const spy = () => calls++;
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(hook.result.current[1]).toBeTruthy();

    // stop the loop
    act(() => {
      hook.result.current[0]();
    });

    setTimeout(() => {
      expect(hook.result.current[1]).toBeFalsy();
      expect(calls).toEqual(0);

      // start the loop
      act(() => {
        hook.result.current[2]();
      });

      setTimeout(() => {
        expect(hook.result.current[1]).toBeTruthy();
        expect(calls).toBeGreaterThanOrEqual(5);
        expect(calls).toBeLessThan(10);

        done();
      }, 100);
    }, 100);
  });

  it('loop should stop itself on unmount', done => {
    let calls = 0;
    const spy = () => calls++;
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    hook.unmount();

    setTimeout(() => {
      expect(calls).toEqual(0);

      done();
    }, 100);
  });
});
