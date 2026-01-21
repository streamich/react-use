# `useHashSearchParams`

React sensor hook that tracks browser's location hash search params.

## Usage

```jsx
import React from 'react';
import { useHash, useHashSearchParams, useMount } from 'react-use';

const Demo = () => {
  const [, setHash] = useHash();
  const [searchParams, setSearchParams] = useHashSearchParams()

  useMount(() => {
    setHash('#/path/to/page?id=1&name=jim');
  });

  return (
    <div>
      <div>window.location.hash:</div>
      <div>
        <pre>{window.location.hash}</pre>
      </div>
      <div>Edit hash: </div>
      <div>
        {Object.keys(searchParams).map(key => {
          const value = searchParams[key]
          return (
            <div>
              <label>{key} </label>
              <input value={value} onChange={e => setSearchParams({ ...searchParams, [key]: e.target.value })} />
            </div>
          )
        })}
      </div>
    </div>
  );
};
```

## API

```ts
interface UseHashSearchParamsType {
  /**
   * set single search param
   * 
   * example:
   * const [id, setId] = useHashSearchParams('id')
   * 
   * @param key - search param name
   * @param defaultValue - return this value if `useSearchParams(key)` is `undefined`
   */
  (key: string, defaultValue?: string): [string, (value: any) => void]
  /**
   * set whole search params
   * 
   * example:
   * const [searchParams, setSearchParams] = useHashSearchParams()
   */
  (): [Record<string, string>, (searchParams: Record<string, any>) => void]
}

export const useHashSearchParams: UseHashSearchParamsType 
```
