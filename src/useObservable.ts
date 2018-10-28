import {useState, useEffect} from './react';

const useObservable = <T>(observable$, initialValue?: T): T | undefined => {
  const [value, update] = useState<T | undefined>(initialValue);
  
  useEffect(() => {
    const s = observable$.subscribe(update)
    return () => s.unsubscribe();
  }, [observable$]);
  
  return value;
}

export default useObservable;
