import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useRaf from '../useRaf';

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
const dateNowSpy = jest.spyOn(Date, 'now');

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
  dateNowSpy.mockImplementationOnce(() => fixedStart); // start time
  dateNowSpy.mockImplementationOnce(() => fixedStart + 1e12 * 0.25); // 25%
  dateNowSpy.mockImplementationOnce(() => fixedStart + 1e12 * 0.5); // 50%
  dateNowSpy.mockImplementationOnce(() => fixedStart + 1e12 * 0.75); // 75%
  dateNowSpy.mockImplementationOnce(() => fixedStart + 1e12); // 100%

  const { result } = renderHook(() => useRaf());
  expect(result.current).toBe(0);

  act(() => {
    jest.runOnlyPendingTimers(); // start after delay
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.25);

  act(() => {
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.5);

  act(() => {
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.75);

  act(() => {
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);
});

it('should return corresponding percentage of time elapsed for custom ms', () => {
  const customMs = 2000;
  dateNowSpy.mockImplementationOnce(() => fixedStart); // start time
  dateNowSpy.mockImplementationOnce(() => fixedStart + customMs * 0.25); // 25%
  dateNowSpy.mockImplementationOnce(() => fixedStart + customMs * 0.5); // 50%
  dateNowSpy.mockImplementationOnce(() => fixedStart + customMs * 0.75); // 75%
  dateNowSpy.mockImplementationOnce(() => fixedStart + customMs); // 100%

  const { result } = renderHook(() => useRaf(customMs));
  expect(result.current).toBe(0);

  act(() => {
    jest.runOnlyPendingTimers(); // start after delay
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.25);

  act(() => {
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.5);

  act(() => {
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(0.75);

  act(() => {
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);
});

it('should return always 1 after corresponding ms reached', () => {
  dateNowSpy.mockImplementationOnce(() => fixedStart); // start time
  dateNowSpy.mockImplementationOnce(() => fixedStart + 1e12); // 100%
  dateNowSpy.mockImplementationOnce(() => fixedStart + 1e12 * 1.1); // 110%
  dateNowSpy.mockImplementationOnce(() => fixedStart + 1e12 * 3); // 300%

  const { result } = renderHook(() => useRaf());
  expect(result.current).toBe(0);

  act(() => {
    jest.runOnlyPendingTimers(); // start after delay
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);

  act(() => {
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);

  act(() => {
    requestAnimationFrame.step();
  });
  expect(result.current).toBe(1);
});

it('should wait until delay reached to start calculating elapsed percentage', () => {
  const { result } = renderHook(() => useRaf(undefined, 500));

  expect(result.current).toBe(0);

  act(() => {
    jest.runTimersToTime(250); // fast-forward only half of custom delay
  });
  expect(result.current).toBe(0);

  act(() => {
    jest.runTimersToTime(249); // fast-forward 1ms less than custom delay
  });
  expect(result.current).toBe(0);

  act(() => {
    jest.runTimersToTime(1); // fast-forward exactly to custom delay
  });
  expect(result.current).not.toBe(0);
});

it('should clear pending timers on unmount', () => {
  const stopSpy = jest.spyOn(global, 'cancelAnimationFrame' as any);
  const { unmount } = renderHook(() => useRaf());

  // @ts-ignore getTimerCount is not defined on jest types
  expect(jest.getTimerCount()).toBe(1);
  expect(stopSpy).not.toHaveBeenCalled();

  unmount();

  // @ts-ignore getTimerCount is not defined on jest types
  expect(jest.getTimerCount()).toBe(0);
  expect(stopSpy).toHaveBeenCalledTimes(1);
});
