import { useRef } from 'react';
import { useFirstMountState } from './useFirstMountState';

export type Predicate<T> = (prev: T | undefined, next: T) => boolean;

const strictEquals = <T>(prev: T | undefined, next: T) => prev === next;

export default function usePreviousDistinct<T>(
  value: T,
  compare: Predicate<T> = strictEquals
): T | undefined {
  const prevRef = useRef<T>();
  const curRef = useRef<T>(value);
  const isFirstMount = useFirstMountState();

  if (!isFirstMount && !compare(curRef.current, value)) {
    prevRef.current = curRef.current;
    curRef.current = value;
  }

  return prevRef.current;
}
