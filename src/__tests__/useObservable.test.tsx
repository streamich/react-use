import { act, renderHook } from 'react-hooks-testing-library';
import { Subject } from 'rxjs';
import { useObservable } from '..';

test('default initial value is undefined', () => {
  const subject$ = new Subject();
  const { result } = renderHook(() => useObservable(subject$));

  expect(result.current).toBe(undefined);
});

test('can specify initial value', () => {
  const subject$ = new Subject();
  const { result } = renderHook(() => useObservable(subject$, 123));

  expect(result.current).toBe(123);
});

test('returns the latest value of observables', () => {
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

xtest('subscribes to observable only once', () => {});
