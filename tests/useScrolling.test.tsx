import React, { useRef } from 'react';
import { act, renderHook } from '@testing-library/react-hooks/dom';
import { fireEvent, render } from '@testing-library/react';
import useScrolling from '../src/useScrolling';

describe('useScrolling', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should remain false when there is no element', () => {
    const { result, unmount } = renderHook(() => useScrolling({ current: null }));

    expect(result.current).toBe(false);
    unmount();
  });

  it('should stop scrolling 150ms after the last scroll event', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    const { result } = renderHook(() => useScrolling(ref));

    expect(result.current).toBe(false);

    act(() => {
      fireEvent.scroll(element);
    });
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(100);
      fireEvent.scroll(element);
      jest.advanceTimersByTime(149);
    });
    expect(result.current).toBe(true);
    expect(jest.getTimerCount()).toBe(1);

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe(false);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should clear a pending timeout on unmount', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    const { unmount } = renderHook(() => useScrolling(ref));

    act(() => {
      fireEvent.scroll(element);
    });
    expect(jest.getTimerCount()).toBe(1);

    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should remove the listener when unmounted without scrolling', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    const { unmount } = renderHook(() => useScrolling(ref));

    unmount();
    fireEvent.scroll(element);

    expect(jest.getTimerCount()).toBe(0);
  });

  it('should clean up the original element after React clears its ref', () => {
    const Demo = () => {
      const ref = useRef<HTMLDivElement>(null);
      const scrolling = useScrolling(ref);

      return <div ref={ref}>{scrolling ? 'Scrolling' : 'Not scrolling'}</div>;
    };
    const { container, unmount } = render(<Demo />);
    const element = container.firstChild as HTMLDivElement;

    fireEvent.scroll(element);
    expect(element.textContent).toBe('Scrolling');
    expect(jest.getTimerCount()).toBe(1);

    unmount();
    expect(jest.getTimerCount()).toBe(0);

    fireEvent.scroll(element);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should clear the previous timeout and listener when the ref changes', () => {
    const previousElement = document.createElement('div');
    const nextElement = document.createElement('div');
    const { result, rerender } = renderHook(({ ref }) => useScrolling(ref), {
      initialProps: { ref: { current: previousElement } },
    });

    act(() => {
      fireEvent.scroll(previousElement);
    });
    expect(jest.getTimerCount()).toBe(1);

    rerender({ ref: { current: nextElement } });
    expect(jest.getTimerCount()).toBe(0);

    act(() => {
      fireEvent.scroll(previousElement);
    });
    expect(jest.getTimerCount()).toBe(0);

    act(() => {
      fireEvent.scroll(nextElement);
    });
    expect(jest.getTimerCount()).toBe(1);

    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe(false);
  });

  it('should remove the listener if the ref points to another element before cleanup', () => {
    const element = document.createElement('div');
    const ref = { current: element };
    const { unmount } = renderHook(() => useScrolling(ref));

    ref.current = document.createElement('div');
    unmount();
    fireEvent.scroll(element);

    expect(jest.getTimerCount()).toBe(0);
  });
});
