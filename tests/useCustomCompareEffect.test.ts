import { renderHook } from '@testing-library/react-hooks';
import { useCustomCompareEffect } from '../src';
import { useEffect } from 'react';
import isDeepEqual from '../src/misc/isDeepEqual';

let options = { max: 10 };
const mockEffectNormal = jest.fn();
const mockEffectDeep = jest.fn();
const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

it('should run provided object once', () => {
  const { rerender: rerenderNormal } = renderHook(() => useEffect(mockEffectNormal, [options]));
  const { rerender: rerenderDeep } = renderHook(() =>
    useCustomCompareEffect(mockEffectDeep, [options], isDeepEqual)
  );

  expect(mockEffectNormal).toHaveBeenCalledTimes(1);
  expect(mockEffectDeep).toHaveBeenCalledTimes(1);

  options = { max: 10 };
  rerenderDeep();
  rerenderNormal();

  expect(mockEffectNormal).toHaveBeenCalledTimes(2);
  expect(mockEffectDeep).toHaveBeenCalledTimes(1);

  options = { max: 10 };
  rerenderNormal();
  rerenderDeep();

  expect(mockEffectNormal).toHaveBeenCalledTimes(3);
  expect(mockEffectDeep).toHaveBeenCalledTimes(1);
});

it('should run clean-up provided on unmount', () => {
  const { unmount } = renderHook(() =>
    useCustomCompareEffect(mockEffectCallback, [options], isDeepEqual)
  );
  expect(mockEffectCleanup).not.toHaveBeenCalled();

  unmount();
  expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});
