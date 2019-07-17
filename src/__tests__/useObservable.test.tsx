import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Subject } from 'rxjs';
import { useObservable } from '..';

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container!);
  container = null;
});

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

test('subscribes to observable only once', async () => {
  const subject = new Subject();
  const spy = jest.spyOn(subject, 'subscribe');

  expect(spy).toHaveBeenCalledTimes(0);

  const Demo = ({ obs }) => {
    const value = useObservable(obs);
    return <>{value}</>;
  };

  ReactDOM.render(<Demo obs={subject} />, container);

  expect(spy).toHaveBeenCalledTimes(1);

  await new Promise(r => setTimeout(r, 1));
  act(() => {
    subject.next('a');
  });
  await new Promise(r => setTimeout(r, 1));
  act(() => {
    subject.next('b');
  });

  expect(spy).toHaveBeenCalledTimes(1);
});

test('re-renders component as obsevable changes', async () => {
  const subject = new Subject();

  let cnt = 0;
  const Demo = ({ obs }) => {
    cnt++;
    const value = useObservable(obs);
    return <>{value}</>;
  };

  ReactDOM.render(<Demo obs={subject} />, container);

  await new Promise(r => setTimeout(r, 1));
  expect(cnt).toBe(1);
  expect(container.innerHTML).toBe('');

  act(() => {
    subject.next('a');
  });

  await new Promise(r => setTimeout(r, 1));
  expect(cnt).toBe(2);
  expect(container.innerHTML).toBe('a');

  act(() => {
    subject.next('b');
  });

  await new Promise(r => setTimeout(r, 1));
  expect(cnt).toBe(3);
  expect(container.innerHTML).toBe('b');
});
