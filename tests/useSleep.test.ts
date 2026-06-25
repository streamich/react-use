import { renderHook } from '@testing-library/react-hooks';
import { useSleep } from '../src';

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

it('should be defined', () => {
  expect(useSleep).toBeDefined();
});

it('should return a function', () => {
  const hook = renderHook(() => useSleep());

  expect(typeof hook.result.current).toBe('function');
});

it('should resolve after given amount of time', (done) => {
  const hook = renderHook(() => useSleep());
  hook.result.current(5).then(() => {
    done();
  });
  jest.advanceTimersByTime(5);
});

it('should resolve 2 timers correctly', (done) => {
  const hook1 = renderHook(() => useSleep());
  const hook2 = renderHook(() => useSleep());
  const spy = jest.fn();
  hook1.result.current(5).then(spy);
  hook2.result.current(10).then(() => {
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });
  jest.advanceTimersByTime(10);
});

it('should cancel timeout on unmount', (done) => {
  const hook1 = renderHook(() => useSleep());
  const hook2 = renderHook(() => useSleep());
  const spy = jest.fn();
  hook1.result.current(5).then(spy);
  hook2.result.current(10).then(() => {
    expect(spy).toHaveBeenCalledTimes(0);
    done();
  });
  hook1.unmount();
  jest.advanceTimersByTime(10);
});

it('should resolve all promises independently', (done) => {
  const hook = renderHook(() => useSleep());
  const spy5 = jest.fn();
  const spy10 = jest.fn();
  hook.result
    .current(5)
    .then(spy5)
    .then(() => {
      expect(spy5).toHaveBeenCalledTimes(1);
      expect(spy10).toHaveBeenCalledTimes(0);
      jest.advanceTimersByTime(5);
    });

  hook.result
    .current(10)
    .then(spy10)
    .then(() => {
      expect(spy5).toHaveBeenCalledTimes(1);
      expect(spy10).toHaveBeenCalledTimes(1);
      done();
    });

  jest.advanceTimersByTime(5);
});
