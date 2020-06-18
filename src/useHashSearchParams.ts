import { useHash } from './useHash';
import { useCallback } from 'react';
import { isClient } from './util';

interface UseHashSearchParamsType {
  /**
   * set single search param
   */
  (key: string, defaultValue?: string): readonly [string, (value: any) => void];
  /**
   * set whole search params
   */
  (): readonly [Record<string, string>, (searchParams: Record<string, any>) => void];
}

/**
 * get/set search param in URL hash
 *
 * example: http://a/b/c#/a/b/c?id=1&name=jim
 * ```js
 * // get specified search param
 * const [id, setId] = useHashSearchParams('id')  // id: "1"
 * // set specified search param
 * setId(2) // http://a/b/c#/a/b/c?id=2&name=jim
 *
 * // get whole search params
 * const [params, setParams] = useHashSearchParams()  // params: {id: "1", name: "jim"}
 * // set whole search params
 * setParams({name: 'jack'})  // http://a/b/c#/a/b/c?id=1&name=jack
 *
 * // return default value if specified param absences
 * const [id, setId] = useHashSearchParams('id2', '2')  // id: "2"
 * ```
 */
export const useHashSearchParamsClient: UseHashSearchParamsType = (key?: any, defaultValue?: any): any => {
  const [hash, setHash] = useHash();
  const questionIndex = hash.indexOf('?');
  const search = questionIndex !== -1 ? hash.substring(questionIndex) : '';
  const usp = new URLSearchParams(search);

  const hashSearchParams: Record<string, string> = {};
  usp.forEach((value, key) => {
    hashSearchParams[key] = value;
  });

  const setHashSearchParams = useCallback(
    (searchParams: Record<string, any>) => {
      const searchPrefix = (questionIndex !== -1 ? hash.slice(0, questionIndex) : hash.slice(0)) + '?';
      const search = Object.keys(searchParams).reduce((finalSearch, key) => {
        if (finalSearch) finalSearch += '&';
        const value = String(searchParams[key]);
        finalSearch += encodeURIComponent(key);
        // remove '=' if param with empty value
        if (value) {
          finalSearch += '=' + encodeURIComponent(value);
        }
        return finalSearch;
      }, '');
      setHash(searchPrefix + search);
    },
    [hash, questionIndex, setHash]
  );

  if (key) {
    return [
      hashSearchParams[key] === undefined ? defaultValue : hashSearchParams[key],
      (value: any) => setHashSearchParams({ ...hashSearchParams, [key]: String(value) }),
    ];
  } else {
    return [hashSearchParams, setHashSearchParams];
  }
};

/**
 * return default values when useHash is called from server
 */
const useHashSearchParamsServer: UseHashSearchParamsType = (key?: any, defaultValue?: any) => {
  console.warn('useHashSearchParams cannot detect hash value when it is called from server');
  if (key) {
    return [defaultValue, () => {}] as const
  } else {
    return [{}, () => {}] as const;
  }
};

export const useHashSearchParams = isClient ? useHashSearchParamsClient : useHashSearchParamsServer
