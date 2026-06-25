import { DependencyList, useEffect, useMemo } from 'react'
import useAsyncFn, { AsyncState } from './useAsyncFn'

export { AsyncState, AsyncFnReturn } from './useAsyncFn'

function isPromise<T>(obj?: Promise<T> | T): obj is Promise<T> {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    'then' in obj &&
    typeof obj.then === 'function'
  )
}

export default function useAsync<T extends unknown>(
  fn: () => Promise<T> | T,
  deps: DependencyList = []
): AsyncState<T> {
  /** First, run the function on mount & when the deps change: */
  const result = useMemo(() => {
    try {
      return { value: fn() }
    } catch (error: any) {
      return { error }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  /** Setup `useAsyncFn` hook incase `fn` is async  */
  const [asyncState, callback] = useAsyncFn(
    async () => {
      /**
       *  Since we don't want to run `fn` twice,
       *   we need to pretend that we ran it here.
       *   That means throwing any errors `fn` threw,
       *   or returning the value that `fn` returned
       */
      if ('error' in result) throw result.error

      return result.value
    },
    [result],
    { loading: true }
  )

  useEffect(() => {
    /**
     * The `useAsyncFn` callback awaits the async `fn` & handles the loading state.
     *    However, if `fn` is sync, we don't need this, so we only run `callback` if `fn` is async
     **/
    if (isPromise(result.value)) {
      callback()
    }
  }, [result, callback])

  /**
   *  If `fn` is async, then we return the output of `useAsyncFn`
   */
  if (isPromise(result.value)) {
    return asyncState
  }

  /*
   *  If `fn` is sync, we return the results of the `useMemo` run.
   */

  /** Did the function error? */
  if ('error' in result) {
    return { loading: false, value: undefined, error: result.error }
  }

  /** The `fn` ran succesfully & synchronously */
  return { loading: false, value: result.value }
}
