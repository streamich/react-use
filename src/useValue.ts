import { MutableRefObject, useRef } from 'react';

const useValue = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useValue;
