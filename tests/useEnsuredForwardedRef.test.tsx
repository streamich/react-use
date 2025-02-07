import React, { useRef } from 'react';
import { render, waitFor } from '@testing-library/react';
import { ensuredForwardRef, useEnsuredForwardedRef } from '../src';

test('should return a valid ref with existing forwardedRef', () => {
  let initialRef: React.MutableRefObject<HTMLDivElement | null> | undefined;
  let ensuredForwardedRef: React.MutableRefObject<HTMLDivElement | null> | undefined;
  const Component = () => {
    const ref = useRef(null);
    const ensuredRef = useEnsuredForwardedRef(ref);
    React.useLayoutEffect(() => {
      initialRef = ref;
      ensuredForwardedRef = ensuredRef;
    }, []);
    return <div ref={ensuredRef} />;
  };

  render(<Component />);

  expect(ensuredForwardedRef).toStrictEqual(initialRef);
});

test('should return a valid ref when the forwarded ref is undefined', () => {
  let ensuredRef: React.MutableRefObject<HTMLDivElement> | undefined;
  const Component = () => {
    const ref = useEnsuredForwardedRef<HTMLDivElement>(undefined!);
    React.useLayoutEffect(() => {
      ensuredRef = ref;
    }, []);
    return <div id="test_id" ref={ref} />;
  };

  render(<Component />);

  expect(ensuredRef?.current?.id).toBe('test_id');
});

test('should return a valid ref when using the wrapper function style', async () => {
  const WrappedComponent = ensuredForwardRef<HTMLDivElement>((_props, ref) => {
    return <div id="test_id" ref={ref} />;
  });

  let initialRef: React.MutableRefObject<HTMLDivElement | null> | undefined;
  const Component = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    React.useLayoutEffect(() => {
      initialRef = ref;
    }, []);
    return <WrappedComponent ref={ref} />;
  };

  render(<Component />);
  await waitFor(() => {
    expect(initialRef?.current).toBeTruthy();
  });
  expect(initialRef?.current?.id).toBe('test_id');
});
