import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export interface Observable<T> {
  subscribe: (listener: (value: T) => void) => {
    unsubscribe: () => void;
  };
}

type TypeOrFnReturnsType<T> = T | (() => T);
type ObservableOrFn<T> = TypeOrFnReturnsType<Observable<T>>

function useObservable<T>(observableOrFn: ObservableOrFn<T>): T | undefined;
function useObservable<T>(observableOrFn: ObservableOrFn<T>, initialValue: T): T;
function useObservable<T>(observableOrFn: ObservableOrFn<T>, initialValue?: T): T | undefined {
  const [observable$] = useState<Observable<T>>(observableOrFn);
  const [value, update] = useState<T | undefined>(initialValue);

  useIsomorphicLayoutEffect(() => {
    const s = observable$.subscribe(update);
    return () => s.unsubscribe();
  }, [observable$]);

  return value;
}

export default useObservable;
