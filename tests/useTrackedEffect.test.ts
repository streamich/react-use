import { renderHook } from '@testing-library/react-hooks';
import { useTrackedEffect } from '../src';

//We use a array to store which dependency has changed
var changedDeps = [];
const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);
const mockEffectWithTracked = jest.fn().mockImplementation((changes) => {
  //This effect callback accept an addition parameter which contains indexes of dependecies which changed their equalities.
  changedDeps = changes;
  return mockEffectCleanup;
});

it('should run provided effect as expected', () => {
  const { rerender } = renderHook(() => useTrackedEffect(mockEffectCallback));
  expect(mockEffectCallback).toHaveBeenCalledTimes(1);

  rerender();
  expect(mockEffectCallback).toHaveBeenCalledTimes(2);
});

it("should run provided effect and return single changed dependecy's index ", () => {
  let var1 = 0;
  let var2 = '0';
  let var3 = { value: 0 };
  const { rerender } = renderHook(() => useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]));
  expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);

  rerender();
  expect(changedDeps).toHaveLength(3);
  changedDeps = [];
  var1++;
  rerender();
  expect(changedDeps).toHaveLength(1);
  expect(changedDeps[0]).toEqual(0);
});

it("should run provided effect and return multiple changed dependecy's indexes", () => {
  let var1 = 0;
  let var2 = '0';
  let var3 = { value: 0 };
  const { rerender } = renderHook(() => useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]));
  expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
  rerender();
  expect(changedDeps).toHaveLength(3);
  changedDeps = [];
  var1++;
  var2 = '1';
  rerender();
  expect(changedDeps).toHaveLength(2);
  expect(changedDeps[0]).toEqual(0);
  expect(changedDeps[1]).toEqual(1);
  changedDeps = [];
  var2 = '2';
  rerender();
  expect(changedDeps).toHaveLength(1);
  expect(changedDeps[0]).toEqual(1);
});
it("should run provided effect and return empty if no dependency changed", () => {
    let var1 = 0;
    let var2 = '0';
    let var3 = { value: 0 };
    const { rerender } = renderHook(() => useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]));
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDeps).toHaveLength(3);
    changedDeps=[]
    var1 = 0;
    rerender();
    expect(changedDeps).toHaveLength(0);
  });
it("should run provided effect and make sure reference equality is correct", () => {
    let var1 = 0;
    let var2 = '0';
    let var3 = { value: 0 };
    const { rerender } = renderHook(() => useTrackedEffect(mockEffectWithTracked, [var1, var2, var3]));
    expect(mockEffectWithTracked).toHaveBeenCalledTimes(1);
    rerender();
    expect(changedDeps).toHaveLength(3);
    changedDeps = [];
    var3.value = 123;
    rerender();
    expect(changedDeps).toHaveLength(0);
  });

it('should run clean-up provided on unmount', () => {
  const { unmount } = renderHook(() => useTrackedEffect(mockEffectCallback));
  expect(mockEffectCleanup).not.toHaveBeenCalled();

  unmount();
  expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});
