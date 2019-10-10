import { useCallback } from 'react';
import useGetSet from './useGetSet';

export interface CounterActions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: number) => void;
  reset: (value?: number) => void;
}

export default function useCounter(
  initialValue: number = 0,
  max: number | null = null,
  min: number | null = null
): [number, CounterActions] {
  typeof initialValue !== 'number' && console.error('initialValue has to be a number, got ' + typeof initialValue);

  if (typeof min === 'number') {
    initialValue = Math.max(initialValue, min);
  } else if (min !== null) {
    console.error('min has to be a number, got ' + typeof min);
  }

  if (typeof max === 'number') {
    initialValue = Math.min(initialValue, max);
  } else if (max !== null) {
    console.error('max has to be a number, got ' + typeof max);
  }

  const [get, setInternal] = useGetSet<number>(initialValue);

  function set(value: number): void {
    const current = get();

    if (current === value) {
      return;
    }

    if (typeof min === 'number') {
      value = Math.max(value, min);
    }
    if (typeof max === 'number') {
      value = Math.min(value, max);
    }

    current !== value && setInternal(value);
  }

  const inc = useCallback(
    (delta: number = 1) => {
      typeof delta !== 'number' && console.error('delta has to be a number, got ' + typeof delta);

      set(get() + delta);
    },
    [max, min]
  );
  const dec = useCallback(
    (delta: number = 1) => {
      typeof delta !== 'number' && console.error('delta has to be a number, got ' + typeof delta);

      set(get() - delta);
    },
    [max, min]
  );
  const reset = useCallback(
    (value: number = initialValue) => {
      typeof value !== 'number' && console.error('value has to be a number, got ' + typeof value);

      initialValue = value;
      set(value);
    },
    [max, min, initialValue]
  );

  const actions = {
    inc,
    dec,
    get,
    set,
    reset,
  };

  return [get(), actions];
}
