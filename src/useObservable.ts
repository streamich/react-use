import { useEffect, useState } from 'react';

export interface Observable<T> {
  subscribe: (
    listener: (value: T) => void
  ) => {
    unsubscribe: () => void;
  };
}

function useObservable<T>(observable$: Observable<T>): T | undefined;
function useObservable<T>(observable$: Observable<T>, initialValue: T): T;
function useObservable<T>(observable$: Observable<T>, initialValue?: T): T | undefined {
  const [value, update] = useState<T | undefined>(initialValue);

  useEffect(() => {
    const s = observable$.subscribe(update);
    return () => s.unsubscribe();
  }, [observable$]);

  return value;
}

export default useObservable;
