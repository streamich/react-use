import { act, renderHook } from '@testing-library/react-hooks';
import { Subject } from 'rxjs';
import * as useIsomorphicLayoutEffect from '../src/useIsomorphicLayoutEffect';
import useObservable, { Observable } from '../src/useObservable';

const setUp = (observable: Observable<any>, initialValue?: any) =>
  renderHook(() => useObservable(observable, initialValue));

it('should init to initial value provided', () => {
  const subject$ = new Subject();
  const { result } = setUp(subject$, 123);

  expect(result.current).toBe(123);
});

it('should init to undefined if not initial value provided', () => {
  const subject$ = new Subject();
  const { result } = setUp(subject$);

  expect(result.current).toBeUndefined();
});

it('should return latest value of observables', () => {
  const subject$ = new Subject();
  const { result } = setUp(subject$, 123);

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

it('should use layout effect to subscribe synchronously', async () => {
  const subject$ = new Subject();
  const spy = jest.spyOn(useIsomorphicLayoutEffect, 'default');

  expect(spy).toHaveBeenCalledTimes(0);

  setUp(subject$, 123);

  expect(spy).toHaveBeenCalledTimes(1);
});

it('should subscribe to observable only once', () => {
  const subject$ = new Subject();
  const spy = jest.spyOn(subject$, 'subscribe');
  expect(spy).not.toHaveBeenCalled();

  setUp(subject$, 123);

  expect(spy).toHaveBeenCalledTimes(1);

  act(() => {
    subject$.next('a');
  });

  act(() => {
    subject$.next('b');
  });

  expect(spy).toHaveBeenCalledTimes(1);
});

it('should return updated value when observable changes', () => {
  const subject$ = new Subject();
  const { result } = setUp(subject$);
  expect(result.current).toBeUndefined();

  act(() => {
    subject$.next('foo');
  });
  expect(result.current).toBe('foo');

  act(() => {
    subject$.next('bar');
  });
  expect(result.current).toBe('bar');
});

it('should unsubscribe from observable', () => {
  const subject$ = new Subject();
  const unsubscribeMock = jest.fn();
  subject$.subscribe = jest.fn().mockReturnValue({
    unsubscribe: unsubscribeMock,
  });

  const { unmount } = setUp(subject$);
  expect(unsubscribeMock).not.toHaveBeenCalled();

  act(() => {
    subject$.next('foo');
  });
  expect(unsubscribeMock).not.toHaveBeenCalled();

  act(() => {
    subject$.next('bar');
  });
  expect(unsubscribeMock).not.toHaveBeenCalled();

  unmount();
  expect(unsubscribeMock).toHaveBeenCalledTimes(1);
});
