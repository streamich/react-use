import writeText from 'copy-to-clipboard';
import { renderHook, act } from '@testing-library/react-hooks';
import { useCopyToClipboard } from '../src';

jest.mock('copy-to-clipboard', () => jest.fn().mockImplementation((value: any) => typeof value === 'string'));

describe('useCopyToClipboard', () => {
  let hook;

  beforeEach(() => {
    hook = renderHook(() => useCopyToClipboard());
  });

  it('should be defined ', () => {
    expect(useCopyToClipboard).toBeDefined();
  });

  it('should pass a given value to copy to clipboard and update the state value if no error', () => {
    const testValue = 'test';
    let [state, copyToClipboard] = hook.result.current;
    act(() => copyToClipboard(testValue));
    [state, copyToClipboard] = hook.result.current;

    expect(writeText).toBeCalled();
    expect(state.value).toBe(testValue);
    expect(state.noUserInteraction).toBe(true);
    expect(state.error).not.toBeDefined();
  });

  it('should set the corresponding noUserInteraction value if returned from copy to clipboard', () => {
    const testValue = {}; // invalid value
    let [state, copyToClipboard] = hook.result.current;
    act(() => copyToClipboard(testValue));
    [state, copyToClipboard] = hook.result.current;

    expect(writeText).toBeCalled();
    expect(state.value).toBe(testValue);
    expect(state.noUserInteraction).toBe(false);
    expect(state.error).toBeDefined();
  });
});
