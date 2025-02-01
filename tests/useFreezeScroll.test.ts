import { renderHook } from '@testing-library/react-hooks';
import { useFreezeScroll } from '../src/useFreezeScroll';

// Mock window.innerWidth and document.documentElement properties
const originalWindowInnerWidth = window.innerWidth;
const originalDocumentElementClientWidth = document.documentElement.clientWidth;

beforeAll(() => {
  Object.defineProperty(window, 'innerWidth', { writable: true, value: 805 }); // Set initial innerWidth
  Object.defineProperty(document.documentElement, 'clientWidth', { writable: true, value: 800 }); // Set initial clientWidth
});

afterAll(() => {
  Object.defineProperty(window, 'innerWidth', { writable: true, value: originalWindowInnerWidth });
  Object.defineProperty(document.documentElement, 'clientWidth', {
    writable: true,
    value: originalDocumentElementClientWidth,
  });
});

describe('useFreezeScroll', () => {
  it('should remove scrollbar and freeze scroll when isActive is true', () => {
    const { unmount } = renderHook(() => useFreezeScroll(true));

    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.documentElement.style.marginRight).toBe('5px'); // Since we mocked innerWidth and clientWidth 805 - 800 = 5px
    unmount();
  });

  it('should restore scrollbar and scroll when isActive becomes false', () => {
    const { rerender, unmount } = renderHook(({ isActive }) => useFreezeScroll(isActive), {
      initialProps: { isActive: true },
    });

    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.documentElement.style.marginRight).toBe('5px');

    rerender({ isActive: false });

    expect(document.documentElement.style.overflow).toBe('visible');
    expect(document.documentElement.style.marginRight).toBe('0px');

    unmount();
  });
});
