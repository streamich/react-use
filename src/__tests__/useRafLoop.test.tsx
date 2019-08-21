import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useRafLoop from '../useRafLoop';

declare var requestAnimationFrame: {
  add: (cb: Function) => number;
  remove: (id: number) => void;
  flush: (duration?: number) => void;
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

describe('useRafLoop', () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it('should be defined', () => {
    expect(useRafLoop).toBeDefined();
  });

  it('should return stop function, start function and loop state', () => {
    const hook = renderHook(() => useRafLoop(() => false), { initialProps: false });

    expect(typeof hook.result.current[0]).toEqual('function');
    expect(typeof hook.result.current[1]).toEqual('boolean');
    expect(typeof hook.result.current[2]).toEqual('function');
  });

  it('should call a callback constantly inside the raf loop', () => {
    const spy = jest.fn();
    renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(spy).not.toBeCalled();
    requestAnimationFrame.step();
    requestAnimationFrame.step();
    expect(spy).toBeCalledTimes(2);
  });

  it('first element call should stop the loop', () => {
    const spy = jest.fn();
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(spy).not.toBeCalled();

    act(() => {
      hook.result.current[0]();
    });
    requestAnimationFrame.step();
    expect(spy).not.toBeCalled();
  });

  it('second element should represent loop state', () => {
    const spy = jest.fn();
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(hook.result.current[1]).toBe(true);

    // stop the loop
    act(() => {
      hook.result.current[0]();
    });
    expect(hook.result.current[1]).toBe(false);
  });

  it('third element call should restart loop', () => {
    const spy = jest.fn();
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(spy).not.toBeCalled();
    // stop the loop
    act(() => {
      hook.result.current[0]();
    });
    requestAnimationFrame.step();
    expect(spy).not.toBeCalled();

    // start the loop
    act(() => {
      hook.result.current[2]();
    });

    requestAnimationFrame.step();
    requestAnimationFrame.step();
    expect(spy).toBeCalledTimes(2);
  });

  it('loop should stop itself on unmount', () => {
    const spy = jest.fn();
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    hook.unmount();

    requestAnimationFrame.step();

    expect(spy).not.toBeCalled();
  });
});
