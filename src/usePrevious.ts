import { useRef } from 'react';

export default function usePrevious<T>(state: T): T | undefined {
  const curRef = useRef<T>();
  const prevRef = useRef<T>();

  prevRef.current = curRef.current;
  curRef.current = state;

  return prevRef.current;
}
