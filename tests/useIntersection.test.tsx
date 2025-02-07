import React, { createRef } from 'react';
import ReactDOM from 'react-dom/client';
import TestRenderer from 'react-test-renderer';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import { renderHook } from '@testing-library/react';
import { useIntersection } from '../src';
import { act } from '@testing-library/react';

beforeEach(() => {
  intersectionObserver.mock();
  const IO = IntersectionObserver;
  jest.spyOn(IO.prototype, 'disconnect');
  jest.spyOn(global as any, 'IntersectionObserver');
  IntersectionObserver.prototype = IO.prototype;
});

afterEach(() => {
  intersectionObserver.restore();
});

describe('useIntersection', () => {
  const container = document.createElement('div');
  let targetRef;

  it('should be defined', () => {
    expect(useIntersection).toBeDefined();
  });

  it('should setup an IntersectionObserver targeting the ref element and using the options provided', () => {
    act(() => {
      targetRef = createRef();
      ReactDOM.createRoot(container).render(<div ref={targetRef} />);
    });

    expect(intersectionObserver.observers).toHaveLength(0);
    const observerOptions = { root: null, threshold: 0.8 };

    renderHook(() => useIntersection(targetRef, observerOptions));

    expect(intersectionObserver.observers).toHaveLength(1);
    expect(intersectionObserver.observers[0].target).toEqual(targetRef.current);
    expect(intersectionObserver.observers[0].options).toEqual(observerOptions);
  });

  it('should return null if a ref without a current value is provided', () => {
    targetRef = createRef();

    const { result } = renderHook(() => useIntersection(targetRef, { root: null, threshold: 1 }));
    expect(result.current).toBe(null);
  });

  it('should reset an intersectionObserverEntry when the ref changes', () => {
    act(() => {
      targetRef = createRef();
      ReactDOM.createRoot(container).render(<div ref={targetRef} />);
    });

    const { result, rerender } = renderHook(() =>
      useIntersection(targetRef, { root: container, threshold: 0.8 })
    );

    const mockIntersectionObserverEntry = {
      boundingClientRect: targetRef.current.getBoundingClientRect(),
      intersectionRatio: 0.81,
      intersectionRect: container.getBoundingClientRect(),
      isIntersecting: true,
      rootBounds: container.getBoundingClientRect(),
      target: targetRef.current,
      time: 300,
    };
    TestRenderer.act(() => {
      intersectionObserver.simulate(mockIntersectionObserverEntry);
    });

    expect(result.current).toEqual(mockIntersectionObserverEntry);

    targetRef.current = document.createElement('div');
    rerender();

    expect(result.current).toEqual(null);
  });

  it('should return null if IntersectionObserver is not supported', () => {
    targetRef = createRef();
    targetRef.current = document.createElement('div');
    delete (window as any).IntersectionObserver;

    expect(() => renderHook(() => useIntersection(targetRef, {}))).not.toThrow();
  });

  it('should disconnect an old IntersectionObserver instance when the ref changes', () => {
    targetRef = createRef();
    targetRef.current = document.createElement('div');

    const { rerender } = renderHook(() => useIntersection(targetRef, {}));

    targetRef.current = document.createElement('div');
    rerender();

    targetRef.current = null;
    rerender();

    expect(IntersectionObserver).toHaveBeenCalledTimes(2);
    expect(IntersectionObserver.prototype.disconnect).toHaveBeenCalledTimes(2);
  });

  it('should return the first IntersectionObserverEntry when the IntersectionObserver registers an intersection', () => {
    act(() => {
      targetRef = createRef();
      ReactDOM.createRoot(container).render(<div ref={targetRef} />);
    });

    const { result } = renderHook(() =>
      useIntersection(targetRef, { root: container, threshold: 0.8 })
    );

    const mockIntersectionObserverEntry = {
      boundingClientRect: targetRef.current.getBoundingClientRect(),
      intersectionRatio: 0.81,
      intersectionRect: container.getBoundingClientRect(),
      isIntersecting: true,
      rootBounds: container.getBoundingClientRect(),
      target: targetRef.current,
      time: 300,
    };
    TestRenderer.act(() => {
      intersectionObserver.simulate(mockIntersectionObserverEntry);
    });

    expect(result.current).toEqual(mockIntersectionObserverEntry);
  });

  it('should setup a new IntersectionObserver when the ref changes', () => {
    let newRef;
    act(() => {
      targetRef = createRef();
      newRef = createRef();
      ReactDOM.createRoot(container).render(
        <div ref={targetRef}>
          <span ref={newRef} />
        </div>
      );
    });

    const observerOptions = { root: null, threshold: 0.8 };
    const { rerender } = renderHook(({ ref, options }) => useIntersection(ref, options), {
      initialProps: { ref: targetRef, options: observerOptions },
    });

    expect(intersectionObserver.observers[0].target).toEqual(targetRef.current);

    TestRenderer.act(() => {
      rerender({ ref: newRef, options: observerOptions });
    });

    expect(intersectionObserver.observers[0].target).toEqual(newRef.current);
  });

  it('should setup a new IntersectionObserver when the options change', () => {
    act(() => {
      targetRef = createRef();
      ReactDOM.createRoot(container).render(<div ref={targetRef} />);
    });

    const initialObserverOptions = { root: null as HTMLElement | null, threshold: 0.8 };
    const { rerender } = renderHook(({ ref, options }) => useIntersection(ref, options), {
      initialProps: { ref: targetRef, options: initialObserverOptions },
    });

    expect(intersectionObserver.observers[0].options).toEqual(initialObserverOptions);

    const newObserverOptions = { root: container, threshold: 1 };
    TestRenderer.act(() => {
      rerender({ ref: targetRef, options: newObserverOptions });
    });

    expect(intersectionObserver.observers[0].options).toEqual(newObserverOptions);
  });
});
