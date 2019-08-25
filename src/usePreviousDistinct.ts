import { useRef } from 'react';

function strictEquals<T>(prev: T | undefined, next: T) {
  return prev === next;
}

export default function usePreviousDistinct<T>(
  value: T,
  compare: (prev: T | undefined, next: T) => boolean = strictEquals
) {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();
  if (!compare(curRef.current, value)) {
    prevRef.current = curRef.current;
    curRef.current = value;
  }

  return prevRef.current;
}
