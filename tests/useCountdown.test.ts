/*
 * @Author: Innei
 * @Date: 2020-09-03 19:19:23
 * @LastEditTime: 2020-09-03 20:21:53
 * @LastEditors: Innei
 * @FilePath: /react-use/tests/useCountdown.test.ts
 * @Coding with Love
 */
import { act, renderHook } from '@testing-library/react-hooks';
import useCountdown from '../src/useCountdown';
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
  expect(useCountdown).toBeDefined();
  const { result } = renderHook(() => useCountdown(50));
  const [, actions] = result.current;
  expect(typeof actions).toBe('object');
  expect(actions).toStrictEqual({
    start: expect.any(Function),
    pause: expect.any(Function),
    stop: expect.any(Function),
  });
});

it('should countdown', async () => {
  const { result } = renderHook(() => useCountdown(50));

  const [countdown, { pause, start, stop }] = result.current;

  expect(countdown).toEqual(0);

  act(() => {
    start();
  });
  expect(result.current[0]).toEqual(50);

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(result.current[0]).toEqual(49);

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(result.current[0]).toEqual(48);

  act(() => {
    pause();
  });
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(result.current[0]).toEqual(48);

  act(() => {
    result.current[1].start();
  });
  act(() => {
    jest.advanceTimersByTime(2000);
  });
  expect(result.current[0]).toEqual(47);

  act(() => {
    stop();
    jest.advanceTimersByTime(1000);
  });
  expect(result.current[0]).toEqual(0);
});
