import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Subject } from 'rxjs';
import { useObservable } from '..';
import * as useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

it('should init to initial value provided', () => {
  const subject$ = new Subject();
  const { result } = renderHook(() => useObservable(subject$, 123));

  expect(result.current).toBe(123);
});

it('should init to undefined if not initial value provided', () => {
  const subject$ = new Subject();
  const { result } = renderHook(() => useObservable(subject$));

  expect(result.current).toBeUndefined();
});

it('should use layout effect (to subscribe synchronously)', async () => {
  const subject = new Subject();
  const spy = jest.spyOn(useIsomorphicLayoutEffect, 'default');

  const Demo = ({ obs }) => {
    const value = useObservable(obs);
    return <>{value}</>;
  };
  expect(spy).toHaveBeenCalledTimes(0);

  TestRenderer.create(<Demo obs={subject} />);

  expect(spy).toHaveBeenCalledTimes(1);
});

it('should return latest value of observables', () => {
  const subject$ = new Subject();
  const { result } = renderHook(() => useObservable(subject$, 123));

  act(() => {
    subject$.next(125);
  });
  expect(result.current).toBe(125);

  act(() => {
    subject$.next(300);
    subject$.next(400);
  });
  expect(result.current).toBe(400);
});

it('should subscribe to observable only once', () => {
  const subject = new Subject();
  const spy = jest.spyOn(subject, 'subscribe');

  expect(spy).not.toHaveBeenCalled();

  const Demo = ({ obs }) => {
    const value = useObservable(obs);
    return <>{value}</>;
  };

  TestRenderer.create(<Demo obs={subject} />);

  expect(spy).toHaveBeenCalledTimes(1);

  act(() => {
    subject.next('a');
  });

  act(() => {
    subject.next('b');
  });

  expect(spy).toHaveBeenCalledTimes(1);
});

it('should re-render component when observable changes', () => {
  const subject = new Subject();

  let cnt = 0;
  const Demo = ({ obs }) => {
    cnt++;
    const value = useObservable(obs);
    return <>{value}</>;
  };

  const testRenderer = TestRenderer.create(<Demo obs={subject} />);
  const testInstance = testRenderer.root;

  expect(cnt).toBe(1);
  expect(testInstance.children).toEqual([]);

  act(() => {
    subject.next('a');
  });

  expect(cnt).toBe(2);
  expect(testInstance.children).toEqual(['a']);

  act(() => {
    subject.next('b');
  });

  expect(cnt).toBe(3);
  expect(testInstance.children).toEqual(['b']);
});

it('should unsubscribe from observable', () => {
  const subject = new Subject();
  const unsubscribeMock = jest.fn();
  subject.subscribe = jest.fn().mockReturnValue({
    unsubscribe: unsubscribeMock,
  });

  expect(unsubscribeMock).not.toHaveBeenCalled();

  const Demo = ({ obs }) => {
    const value = useObservable(obs);
    return <>{value}</>;
  };

  const testRenderer = TestRenderer.create(<Demo obs={subject} />);

  expect(unsubscribeMock).not.toHaveBeenCalled();

  act(() => {
    subject.next('a');
  });

  act(() => {
    subject.next('b');
  });

  expect(unsubscribeMock).not.toHaveBeenCalled();

  testRenderer.unmount();

  expect(unsubscribeMock).toHaveBeenCalledTimes(1);
});
