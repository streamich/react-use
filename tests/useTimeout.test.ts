import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useTimeout } from '../src';
import { UseTimeoutReturn } from '../src/useTimeout';

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
  expect(useTimeout).toBeDefined();
});

it('should return three functions', () => {
  const hook = renderHook(() => useTimeout(5));

  expect(hook.result.current.length).toBe(3);
  expect(typeof hook.result.current[0]).toBe('function');
  expect(typeof hook.result.current[1]).toBe('function');
  expect(typeof hook.result.current[2]).toBe('function');
});

function getHook(
  ms: number = 5
): [jest.Mock, RenderHookResult<{ delay: number }, UseTimeoutReturn>] {
  const spy = jest.fn();
  return [
    spy,
    renderHook(
      ({ delay = 5 }) => {
        spy();
        return useTimeout(delay);
      },
      { initialProps: { delay: ms } }
    ),
  ];
}

it('should re-render component after given amount of time', (done) => {
  const [spy, hook] = getHook();
  expect(spy).toHaveBeenCalledTimes(1);
  hook.waitForNextUpdate().then(() => {
    expect(spy).toHaveBeenCalledTimes(2);
    done();
  });
  jest.advanceTimersByTime(5);
});

it('should cancel timeout on unmount', () => {
  const [spy, hook] = getHook();

  expect(spy).toHaveBeenCalledTimes(1);
  hook.unmount();
  jest.advanceTimersByTime(5);
  expect(spy).toHaveBeenCalledTimes(1);
});

it('first function should return actual state of timeout', (done) => {
  let [, hook] = getHook();
  let [isReady] = hook.result.current;

  expect(isReady()).toBe(false);
  hook.unmount();
  expect(isReady()).toBe(null);

  [, hook] = getHook();
  [isReady] = hook.result.current;
  hook.waitForNextUpdate().then(() => {
    expect(isReady()).toBe(true);

    done();
  });
  jest.advanceTimersByTime(5);
});

it('second function should cancel timeout', () => {
  const [spy, hook] = getHook();
  const [isReady, cancel] = hook.result.current;

  expect(spy).toHaveBeenCalledTimes(1);
  expect(isReady()).toBe(false);

  act(() => {
    cancel();
  });
  jest.advanceTimersByTime(5);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(isReady()).toBe(null);
});

it('third function should reset timeout', (done) => {
  const [spy, hook] = getHook();
  const [isReady, cancel, reset] = hook.result.current;

  expect(isReady()).toBe(false);

  act(() => {
    cancel();
  });
  jest.advanceTimersByTime(5);

  expect(isReady()).toBe(null);

  act(() => {
    reset();
  });
  expect(isReady()).toBe(false);

  hook.waitForNextUpdate().then(() => {
    expect(spy).toHaveBeenCalledTimes(2);
    expect(isReady()).toBe(true);

    done();
  });
  jest.advanceTimersByTime(5);
});

it('should reset timeout on delay change', (done) => {
  const [spy, hook] = getHook(15);

  expect(spy).toHaveBeenCalledTimes(1);
  hook.rerender({ delay: 5 });

  hook.waitForNextUpdate().then(() => {
    expect(spy).toHaveBeenCalledTimes(3);

    done();
  });
  jest.advanceTimersByTime(15);
});
