import { renderHook } from '@testing-library/react-hooks';
import { useUnmount } from '..';

const mockCallback = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
});

it('should not call provided callback on mount', () => {
  renderHook(() => useUnmount(mockCallback));

  expect(mockCallback).not.toHaveBeenCalled();
});

it('should call provided callback on unmount', () => {
  const { unmount } = renderHook(() => useUnmount(mockCallback));
  expect(mockCallback).not.toHaveBeenCalled();

  unmount();

  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('should not call provided callback on rerender', () => {
  const { rerender } = renderHook(() => useUnmount(mockCallback));
  expect(mockCallback).not.toHaveBeenCalled();

  rerender();

  expect(mockCallback).not.toHaveBeenCalled();
});
