import { renderHook } from '@testing-library/react-hooks';
import { useDeepCompareEffect } from '../src';
import { useEffect } from 'react';

let options = { max: 10 };
const mockEffectNormal = jest.fn();
const mockEffectDeep = jest.fn();
const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

it('should run provided object once', () => {
  const { rerender: rerenderNormal } = renderHook(() => useEffect(mockEffectNormal, [options]));
  const { rerender: rerenderDeep } = renderHook(() =>
    useDeepCompareEffect(mockEffectDeep, [options])
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
  const { unmount } = renderHook(() => useDeepCompareEffect(mockEffectCallback, [options]));
  expect(mockEffectCleanup).not.toHaveBeenCalled();

  unmount();
  expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});

it('should not throw when comparing null-prototype objects', () => {
  const mockEffect = jest.fn();
  const createNullProtoDep = (value: number) => {
    const dep = Object.create(null);
    dep.value = value;
    return dep;
  };

  let dep = createNullProtoDep(1);
  const { rerender, result } = renderHook(() => useDeepCompareEffect(mockEffect, [dep]));
  expect(result.error).toBeUndefined();
  expect(mockEffect).toHaveBeenCalledTimes(1);

  // Same shape -> comparison must not throw and the effect must not re-run.
  dep = createNullProtoDep(1);
  rerender();
  expect(result.error).toBeUndefined();
  expect(mockEffect).toHaveBeenCalledTimes(1);

  // Different value -> comparison must not throw and the effect should re-run.
  dep = createNullProtoDep(2);
  rerender();
  expect(result.error).toBeUndefined();
  expect(mockEffect).toHaveBeenCalledTimes(2);
});
