import { useMemo } from 'react';

const createMemo = <T extends (...args: any) => any>(fn: T) => (...args: Parameters<T>) =>
  useMemo<ReturnType<T>>(() => fn(...args), args);

export default createMemo;
