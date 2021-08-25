import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { renderHook } from '@testing-library/react-hooks';
import TestUtils from 'react-dom/test-utils';
import { ensuredForwardRef, useEnsuredForwardedRef } from '../src';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null!;
});

test('should return a valid ref with existing forwardedRef', () => {
  const { result } = renderHook(() => {
    const ref = useRef(null);
    const ensuredRef = useEnsuredForwardedRef(ref);

    TestUtils.act(() => {
      ReactDOM.render(<div ref={ensuredRef} />, container);
    });

    return {
      initialRef: ref,
      ensuredForwardedRef: ensuredRef,
    };
  });

  const { initialRef, ensuredForwardedRef } = result.current;

  expect(ensuredForwardedRef).toStrictEqual(initialRef);
});

test('should return a valid ref when the forwarded ref is undefined', () => {
  const { result } = renderHook(() => {
    const ref = useEnsuredForwardedRef<HTMLDivElement>(undefined!);

    TestUtils.act(() => {
      ReactDOM.render(<div id="test_id" ref={ref} />, container);
    });

    return { ensuredRef: ref };
  });

  const { ensuredRef } = result.current;

  expect(ensuredRef.current.id).toBe('test_id');
});

test('should return a valid ref when using the wrapper function style', () => {
  const { result } = renderHook(() => {
    const initialRef = useRef<HTMLDivElement | null>(null);

    const WrappedComponent = ensuredForwardRef<HTMLDivElement>((_props, ref) => {
      return <div id="test_id" ref={ref} />;
    });

    TestUtils.act(() => {
      ReactDOM.render(<WrappedComponent ref={initialRef} />, container);
    });

    return { initialRef };
  });

  const { initialRef } = result.current;

  expect(initialRef.current).toBeTruthy();
  expect(initialRef.current?.id).toBe('test_id');
});
