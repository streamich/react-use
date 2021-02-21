import { sleep } from './misc/sleep';
import { DependencyList, useEffect, useState } from 'react';
import useAsyncFn, { AsyncState } from './useAsyncFn';

export type PollingState<T> = {
  attempt: number;
  results: T[];
  currentResult?: T;
};
export type AsyncStatePolling<T> = AsyncState<T> & PollingState<T>;
export type NextFn<T> = (curretnResult: T) => void;
export type PollingOptions = {
  maxAttempts?: number;
  interval?: number | ((attempt: number) => number);
};
export class MaxAttemptsError extends Error {}

type DeepNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

type Opts = DeepNonNullable<PollingOptions>;

const defaultOptions: Opts = {
  maxAttempts: 30,
  interval: 2 * 1000,
};

const useAsyncPolling = <T>(
  options: PollingOptions,
  fn: (next: NextFn<T>) => Promise<T>,
  deps: DependencyList = []
): AsyncStatePolling<T> => {
  const opts = { ...defaultOptions, ...options } as Opts;

  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  const [pollingState, setPollingState] = useState<PollingState<T>>({
    attempt: 1,
    results: [],
  });

  let attempt = 1;
  async function next(currentResult: T) {
    setPollingState((pollingState) => {
      return {
        ...pollingState,
        results: [...pollingState.results, currentResult],
        currentResult,
      };
    });

    if (attempt === opts.maxAttempts) {
      throw new MaxAttemptsError(`Max attempts exceeded`);
    }

    await sleep(opts.interval instanceof Function ? opts.interval(attempt) : opts.interval);

    setPollingState((pollingState) => {
      return {
        ...pollingState,
        attempt: (attempt += 1),
      };
    });

    return await callback(next);
  }

  useEffect(() => {
    callback(next);
  }, [callback]);

  return { ...state, ...pollingState };
};

export default useAsyncPolling;
