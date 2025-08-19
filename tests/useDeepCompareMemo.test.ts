import { renderHook } from '@testing-library/react-hooks';
import { useDeepCompareMemo } from '../src';
import { useMemo } from 'react';

let options = { max: 10 };
const mockMemoNormal = jest.fn();
const mockMemoDeep = jest.fn();

it('should run provided object once', () => {
  const { rerender: rerenderNormal } = renderHook(() => useMemo(mockMemoNormal, [options]));
  const { rerender: rerenderDeep } = renderHook(() => useDeepCompareMemo(mockMemoDeep, [options]));

  expect(mockMemoNormal).toHaveBeenCalledTimes(1);
  expect(mockMemoDeep).toHaveBeenCalledTimes(1);

  options = { max: 10 };
  rerenderDeep();
  rerenderNormal();

  expect(mockMemoNormal).toHaveBeenCalledTimes(2);
  expect(mockMemoDeep).toHaveBeenCalledTimes(1);

  options = { max: 10 };
  rerenderNormal();
  rerenderDeep();

  expect(mockMemoNormal).toHaveBeenCalledTimes(3);
  expect(mockMemoDeep).toHaveBeenCalledTimes(1);
});
