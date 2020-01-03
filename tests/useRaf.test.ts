import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useRaf from '../src/useRaf';

/**
 * New requestAnimationFrame after being replaced with raf-stub for testing purposes.
 */
interface RequestAnimationFrame {
  reset(): void;

  step(): void;
}

declare var requestAnimationFrame: RequestAnimationFrame;

replaceRaf();
const fixedStart = 1564949709496;
const spyDateNow = jest.spyOn(Date, 'now').mockImplementation(() => fixedStart);

beforeEach(() => {
  jest.useFakeTimers();
  requestAnimationFrame.reset();
});

afterEach(() => {
  jest.clearAllTimers();
  requestAnimationFrame.reset();
});

it('should init percentage of time elapsed', () => {
  const { result } = renderHook(() => useRaf());
  const timeElapsed = result.current;

  expect(timeElapsed).toBe(0);
});

it('should return corresponding percentage of time elapsed for default ms', () => {
  const { result } = renderHook(() => useRaf());
  expect(result.current).toBe(0);

  act(() => {
    jest.runOnlyPendingTimers(); // start after delay
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e12 * 0.25); // 25%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.25);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e12 * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.5);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e12 * 0.75); // 75%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.75);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e12); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);
});

it('should return corresponding percentage of time elapsed for custom ms', () => {
  const customMs = 2000;

  const { result } = renderHook(() => useRaf(customMs));
  expect(result.current).toBe(0);

  act(() => {
    jest.runOnlyPendingTimers(); // start after delay
    spyDateNow.mockImplementationOnce(() => fixedStart + customMs * 0.25); // 25%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.25);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + customMs * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.5);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + customMs * 0.75); // 75%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.75);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + customMs); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);
});

it('should return always 1 after corresponding ms reached', () => {
  const { result } = renderHook(() => useRaf());
  expect(result.current).toBe(0);

  act(() => {
    jest.runOnlyPendingTimers(); // start after delay
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e12); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e12 * 1.1); // 110%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e12 * 3); // 300%
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);
});

it('should wait until delay reached to start calculating elapsed percentage', () => {
  const { result } = renderHook(() => useRaf(undefined, 500));

  expect(result.current).toBe(0);

  act(() => {
    jest.advanceTimersByTime(250); // fast-forward only half of custom delay
  });
  expect(result.current).toBe(0);

  act(() => {
    jest.advanceTimersByTime(249); // fast-forward 1ms less than custom delay
  });
  expect(result.current).toBe(0);

  act(() => {
    jest.advanceTimersByTime(1); // fast-forward exactly to custom delay
  });
  expect(result.current).not.toBe(0);
});

it('should clear pending timers on unmount', () => {
  const spyRafStop = jest.spyOn(global, 'cancelAnimationFrame' as any);
  const { unmount } = renderHook(() => useRaf());

  expect(clearTimeout).not.toHaveBeenCalled();
  expect(spyRafStop).not.toHaveBeenCalled();

  unmount();

  expect(clearTimeout).toHaveBeenCalledTimes(2);
  expect(spyRafStop).toHaveBeenCalledTimes(1);
});
