import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { renderHook } from '@testing-library/react-hooks';
import TestUtils from 'react-dom/test-utils';
import { useEnsuredForwardedRef } from '../src';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
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
    const ref = useEnsuredForwardedRef<HTMLDivElement>(undefined);

    TestUtils.act(() => {
      ReactDOM.render(<div id="test_id" ref={ref} />, container);
    });

    return { ensuredRef: ref };
  });

  const { ensuredRef } = result.current;

  expect(ensuredRef.current.id).toBe('test_id');
});
