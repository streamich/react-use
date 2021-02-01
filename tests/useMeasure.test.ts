import { renderHook, act } from '@testing-library/react-hooks';
import useMeasure, { UseMeasureRef } from '../src/useMeasure';

it('by default, state defaults every value to -1', () => {
  const { result } = renderHook(() => useMeasure());

  act(() => {
    const div = document.createElement('div');
    (result.current[0] as UseMeasureRef)(div);
  });

  expect(result.current[1]).toMatchObject({
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
});

it('synchronously sets up ResizeObserver listener', () => {
  let listener: ((rect: any) => void) | undefined = undefined;
  (window as any).ResizeObserver = class ResizeObserver {
    constructor(ls) {
      listener = ls;
    }
    observe() {}
    disconnect() {}
  };

  const { result } = renderHook(() => useMeasure());

  act(() => {
    const div = document.createElement('div');
    (result.current[0] as UseMeasureRef)(div);
  });

  expect(typeof listener).toBe('function');
});

it('tracks rectangle of a DOM element', () => {
  let listener: ((rect: any) => void) | undefined = undefined;
  (window as any).ResizeObserver = class ResizeObserver {
    constructor(ls) {
      listener = ls;
    }
    observe() {}
    disconnect() {}
  };

  const { result } = renderHook(() => useMeasure());

  act(() => {
    const div = document.createElement('div');
    (result.current[0] as UseMeasureRef)(div);
  });

  act(() => {
    listener!([
      {
        contentRect: {
          x: 1,
          y: 2,
          width: 200,
          height: 200,
          top: 100,
          bottom: 0,
          left: 100,
          right: 0,
        },
      },
    ]);
  });

  expect(result.current[1]).toMatchObject({
    x: 1,
    y: 2,
    width: 200,
    height: 200,
    top: 100,
    bottom: 0,
    left: 100,
    right: 0,
  });
});

it('tracks multiple updates', () => {
  let listener: ((rect: any) => void) | undefined = undefined;
  (window as any).ResizeObserver = class ResizeObserver {
    constructor(ls) {
      listener = ls;
    }
    observe() {}
    disconnect() {}
  };

  const { result } = renderHook(() => useMeasure());

  act(() => {
    const div = document.createElement('div');
    (result.current[0] as UseMeasureRef)(div);
  });

  act(() => {
    listener!([
      {
        contentRect: {
          x: 1,
          y: 1,
          width: 1,
          height: 1,
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      },
    ]);
  });

  expect(result.current[1]).toMatchObject({
    x: 1,
    y: 1,
    width: 1,
    height: 1,
    top: 1,
    bottom: 1,
    left: 1,
    right: 1,
  });

  act(() => {
    listener!([
      {
        contentRect: {
          x: 2,
          y: 2,
          width: 2,
          height: 2,
          top: 2,
          bottom: 2,
          left: 2,
          right: 2,
        },
      },
    ]);
  });

  expect(result.current[1]).toMatchObject({
    x: 2,
    y: 2,
    width: 2,
    height: 2,
    top: 2,
    bottom: 2,
    left: 2,
    right: 2,
  });
});

it('calls .disconnect() on ResizeObserver when component unmounts', () => {
  const disconnect = jest.fn();
  (window as any).ResizeObserver = class ResizeObserver {
    observe() {}
    disconnect() {
      disconnect();
    }
  };

  const { result, unmount } = renderHook(() => useMeasure());

  act(() => {
    const div = document.createElement('div');
    (result.current[0] as UseMeasureRef)(div);
  });

  expect(disconnect).toHaveBeenCalledTimes(0);

  unmount();

  expect(disconnect).toHaveBeenCalledTimes(1);
});
