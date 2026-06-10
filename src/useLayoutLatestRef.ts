import { useLayoutEffect, useRef } from 'react';

const useLatestRef = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
};

export default useLatestRef;
