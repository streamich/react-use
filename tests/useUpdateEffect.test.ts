import { renderHook } from '@testing-library/react-hooks';
import { useUpdateEffect } from '../src';

const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

it('should run effect on update', () => {
  const { rerender } = renderHook(() => useUpdateEffect(mockEffectCallback));
  expect(mockEffectCallback).not.toHaveBeenCalled();

  rerender();
  expect(mockEffectCallback).toHaveBeenCalledTimes(1);
});
