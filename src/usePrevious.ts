import { useState } from 'react';

export default function usePrevious<T>(state: T): T | undefined {
  const [current, setCurrent] = useState<T>(state);
  const [previous, setPrevious] = useState<T>();

  if (current !== state) {
    setCurrent(state);
    setPrevious(current);
  }

  return previous;
}
