import { renderHook } from '@testing-library/react-hooks';
import useLongPress from '../src/useLongPress';

const callback = jest.fn();
const defaultDelay = 300;
const mouseDown = new MouseEvent('mousedown');
const touchStart = new TouchEvent('touchstart');

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  callback.mockRestore();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

it('should not call provided callback without trigger any event', () => {
  renderHook(() => useLongPress(callback));

  expect(callback).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(defaultDelay);

  expect(callback).toHaveBeenCalledTimes(0);
});

it('should call provided callback onMouseDown', () => {
  const { result } = renderHook(() => useLongPress(callback));
  const { onMouseDown } = result.current;

  expect(callback).toHaveBeenCalledTimes(0);
  onMouseDown(mouseDown);

  jest.advanceTimersByTime(defaultDelay - 20);
  expect(callback).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(20);
  expect(callback).toHaveBeenCalledTimes(1);
});

it('should call provided callback with custom delay', () => {
  const customDelay = 1000;
  const { result } = renderHook(() => useLongPress(callback, { delay: customDelay }));
  const { onMouseDown } = result.current;

  expect(callback).toHaveBeenCalledTimes(0);
  onMouseDown(mouseDown);

  jest.advanceTimersByTime(customDelay - 20);
  expect(callback).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(20);
  expect(callback).toHaveBeenCalledTimes(1);
});

it('should not call provided callback if interrupted by onMouseLeave', () => {
  const { result } = renderHook(() => useLongPress(callback));
  const { onMouseDown, onMouseLeave } = result.current;

  expect(callback).toHaveBeenCalledTimes(0);
  onMouseDown(mouseDown);

  jest.advanceTimersByTime(defaultDelay - 20);
  expect(callback).toHaveBeenCalledTimes(0);

  onMouseLeave();

  jest.advanceTimersByTime(20);
  expect(callback).toHaveBeenCalledTimes(0);
  expect(setTimeout).toHaveBeenCalledTimes(1);
});

it('should not call provided callback if interrupted by onMouseUp', () => {
  const { result } = renderHook(() => useLongPress(callback));
  const { onMouseDown, onMouseUp } = result.current;

  expect(callback).toHaveBeenCalledTimes(0);
  onMouseDown(mouseDown);

  jest.advanceTimersByTime(defaultDelay - 20);
  expect(callback).toHaveBeenCalledTimes(0);

  onMouseUp();

  jest.advanceTimersByTime(20);
  expect(callback).toHaveBeenCalledTimes(0);
  expect(setTimeout).toHaveBeenCalledTimes(1);
});

it('should call provided callback onTouchStart', () => {
  const { result } = renderHook(() => useLongPress(callback));
  const { onTouchStart } = result.current;

  expect(callback).toHaveBeenCalledTimes(0);
  onTouchStart(touchStart);

  jest.advanceTimersByTime(defaultDelay - 20);
  expect(callback).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(20);
  expect(callback).toHaveBeenCalledTimes(1);
});

it('should not call provided callback if interrupted by onTouchEnd', () => {
  const { result } = renderHook(() => useLongPress(callback));
  const { onTouchStart, onTouchEnd } = result.current;

  expect(callback).toHaveBeenCalledTimes(0);
  onTouchStart(touchStart);

  jest.advanceTimersByTime(defaultDelay - 20);
  expect(callback).toHaveBeenCalledTimes(0);

  onTouchEnd();

  jest.advanceTimersByTime(20);
  expect(callback).toHaveBeenCalledTimes(0);
  expect(setTimeout).toHaveBeenCalledTimes(1);
});
