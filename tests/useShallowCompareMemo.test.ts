import { renderHook } from '@testing-library/react-hooks';
import { useShallowCompareMemo } from '../src';
import { useMemo } from 'react';

let options1 = { max: 10, range: { from: 0, to: 10 } };
const options2 = { max: 10, range: { from: 0, to: 10 } };
const mockMemoNormal = jest.fn();
const mockMemoShallow = jest.fn();

it('should shallow compare dependencies', () => {
  const { rerender: rerenderNormal } = renderHook(() => useMemo(mockMemoNormal, [options1, options2]));
  const { rerender: rerenderShallow } = renderHook(() => useShallowCompareMemo(mockMemoShallow, [options1, options2]));

  expect(mockMemoNormal).toHaveBeenCalledTimes(1);
  expect(mockMemoShallow).toHaveBeenCalledTimes(1);

  options1 = { max: 10, range: options1.range };
  rerenderShallow();
  rerenderNormal();

  expect(mockMemoNormal).toHaveBeenCalledTimes(2);
  expect(mockMemoShallow).toHaveBeenCalledTimes(1);

  options1 = { max: 10, range: { from: 0, to: 10 } };
  rerenderNormal();
  rerenderShallow();

  expect(mockMemoNormal).toHaveBeenCalledTimes(3);
  expect(mockMemoShallow).toHaveBeenCalledTimes(2);
});
