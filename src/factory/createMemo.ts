import { useMemo, useRef } from 'react';

const createMemo =
  <T extends (...args: any) => any>(fn: T) =>
  (...args: Parameters<T>) => {
    const argsRef = useRef(args);

    if (
      args.length !== argsRef.current.length ||
      args.some((argument, index) => !Object.is(argument, argsRef.current[index]))
    ) {
      argsRef.current = args;
    }

    const memoizedArgs = argsRef.current;

    return useMemo<ReturnType<T>>(() => fn(...memoizedArgs), [memoizedArgs]);
  };

export default createMemo;
