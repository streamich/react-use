import { renderHook } from '@testing-library/react-hooks';
import useScrolling from '../src/useScrolling';

describe('useScrolling', () => {
  it('removes the listener from the element it originally observed', () => {
    const element = document.createElement('div');
    const replacement = document.createElement('div');
    const removeListener = jest.spyOn(element, 'removeEventListener');
    const removeReplacementListener = jest.spyOn(replacement, 'removeEventListener');
    const ref = { current: element };

    const { unmount } = renderHook(() => useScrolling(ref));

    ref.current = replacement;
    unmount();

    expect(removeListener).toHaveBeenCalledWith('scroll', expect.any(Function), false);
    expect(removeReplacementListener).not.toHaveBeenCalled();
  });

  it('removes the listener when the ref has been cleared', () => {
    const element = document.createElement('div');
    const removeListener = jest.spyOn(element, 'removeEventListener');
    const ref: { current: HTMLElement | null } = { current: element };
    const { unmount } = renderHook(() => useScrolling(ref));

    ref.current = null;
    unmount();

    expect(removeListener).toHaveBeenCalledWith('scroll', expect.any(Function), false);
  });
});
