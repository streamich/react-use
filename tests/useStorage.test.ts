/* eslint-disable */
import useStorage, { resetStorageState } from '../src/useStorage';
import 'jest-localstorage-mock';
import { renderHook, act } from '@testing-library/react-hooks';

describe(useStorage, () => {
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    jest.clearAllMocks();
    resetStorageState();
  });

  it('localStorage keys should not conflict with sessionStorage keys', () => {
    const { result: result1 } = renderHook(() => useStorage('localStorage', 'foo', 'baz', { raw: true }));
    const { result: result2 } = renderHook(() => useStorage('sessionStorage', 'foo', 'bar', { raw: true }));
    let [ state1, setState1 ] = result1.current;
    let [ state2, setState2 ] = result2.current;
    expect(state1).toBe('baz');
    expect(state2).toBe('bar');
    act(() => {
      setState1('baz-new');
    });
    [ state1, setState1 ] = result1.current;
    [ state2, setState2 ] = result2.current;
    expect(state1).toBe('baz-new');
    expect(state2).toBe('bar');
    act(() => {
      setState2('bar-new');
    });
    [ state1, setState1 ] = result1.current;
    [ state2, setState2 ] = result2.current;
    expect(state1).toBe('baz-new');
    expect(state2).toBe('bar-new');
  });
});
