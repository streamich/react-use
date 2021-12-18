import { renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useRafLoop from '../src/useRafLoop';

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

  it('should return object with start, stop and isActive functions', () => {
    const hook = renderHook(() => useRafLoop(() => false), { initialProps: false });

    expect(hook.result.current).toStrictEqual([
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);
  });

  it('should constantly call callback inside the raf loop', () => {
    const spy = jest.fn();
    renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(spy).not.toBeCalled();
    requestAnimationFrame.step(2);
    expect(spy).toBeCalledTimes(2);
    requestAnimationFrame.step(2);
    expect(spy).toBeCalledTimes(4);
  });

  it('should not start the loop if 2nd hook parameter is falsy', () => {
    const spy = jest.fn();
    renderHook(() => useRafLoop(spy, false), { initialProps: false });

    expect(spy).not.toBeCalled();
    requestAnimationFrame.step(2);
    expect(spy).not.toBeCalled();
  });

  it('should pass the time argument to given callback', () => {
    const spy = jest.fn();
    renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(spy).not.toBeCalled();
    requestAnimationFrame.step();
    expect(typeof spy.mock.calls[0][0]).toBe('number');
  });

  it('should stop the loop on component unmount', () => {
    const spy = jest.fn();
    const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

    expect(spy).not.toBeCalled();
    requestAnimationFrame.step(2);
    expect(spy).toBeCalledTimes(2);

    hook.unmount();

    requestAnimationFrame.step(2);
    expect(spy).toBeCalledTimes(2);
  });

  it('should call the actual callback when it changed', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const hook = renderHook(({ cb }) => useRafLoop(cb), { initialProps: { cb: spy1 } });

    expect(spy1).not.toBeCalled();
    requestAnimationFrame.step(2);
    expect(spy1).toBeCalledTimes(2);

    hook.rerender({ cb: spy2 });

    requestAnimationFrame.step(2);
    expect(spy1).toBeCalledTimes(2);
    expect(spy2).toBeCalledTimes(2);
  });

  describe('returned methods', () => {
    it('stop method should stop the loop', () => {
      const spy = jest.fn();
      const hook = renderHook(() => useRafLoop(spy), { initialProps: false });

      const [stop] = hook.result.current;

      expect(spy).not.toBeCalled();
      requestAnimationFrame.step(2);
      expect(spy).toBeCalledTimes(2);

      stop();

      requestAnimationFrame.step(2);
      expect(spy).toBeCalledTimes(2);
    });

    it('start method should start stopped loop', () => {
      const spy = jest.fn();
      const hook = renderHook(() => useRafLoop(spy, false), { initialProps: false });

      const [stop, start] = hook.result.current;

      expect(spy).not.toBeCalled();
      requestAnimationFrame.step(2);
      expect(spy).not.toBeCalled();

      start();

      requestAnimationFrame.step(2);
      expect(spy).toBeCalledTimes(2);

      stop();

      requestAnimationFrame.step(2);
      expect(spy).toBeCalledTimes(2);

      start();

      requestAnimationFrame.step(2);
      expect(spy).toBeCalledTimes(4);
    });

    it('isActive method should return current loop state', () => {
      const spy = jest.fn();
      const hook = renderHook(() => useRafLoop(spy, false), { initialProps: false });

      const [stop, start, isActive] = hook.result.current;

      expect(isActive()).toBe(false);
      start();
      expect(isActive()).toBe(true);
      stop();
      expect(isActive()).toBe(false);
    });
  });
});
