import { renderHook } from '@testing-library/react-hooks';
import { useShallowCompareEffect } from '../src';
import { useEffect } from 'react';

let options = { max: 10, range: { from: 0, to: 10 } };
const mockEffectNormal = jest.fn();
const mockEffectShallow = jest.fn();
const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

it('should shallow compare dependencies', () => {
  const { rerender: rerenderNormal } = renderHook(() => useEffect(mockEffectNormal, [options]));
  const { rerender: rerenderShallow } = renderHook(() => useShallowCompareEffect(mockEffectShallow, [options]));

  expect(mockEffectNormal).toHaveBeenCalledTimes(1);
  expect(mockEffectShallow).toHaveBeenCalledTimes(1);

  options = { max: 10, range: options.range };
  rerenderShallow();
  rerenderNormal();

  expect(mockEffectNormal).toHaveBeenCalledTimes(2);
  expect(mockEffectShallow).toHaveBeenCalledTimes(1);

  options = { max: 10, range: { from: 0, to: 10 } };
  rerenderNormal();
  rerenderShallow();

  expect(mockEffectNormal).toHaveBeenCalledTimes(3);
  expect(mockEffectShallow).toHaveBeenCalledTimes(2);
});

it('should run clean-up provided on unmount', () => {
  const { unmount } = renderHook(() => useShallowCompareEffect(mockEffectCallback, [options]));
  expect(mockEffectCleanup).not.toHaveBeenCalled();

  unmount();
  expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});
