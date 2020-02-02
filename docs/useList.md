# `useList`

Tracks an array and provides methods to modify it.  
To cause component re-render you have to use these methods instead of direct interaction with array - it won't cause re-render.

We can ensure that actions object and actions itself will not mutate or change between renders, so there is no need to add it to useEffect dependencies and safe to pass them down to children.  

**Note:** `remove` action is deprecated and actually is a copy of `removeAt` action. Within closest updates it will gain different functionality.

## Usage

```jsx
import {useList} from 'react-use';

const Demo = () => {
  const [list, { set, push, updateAt, insertAt, update, updateFirst, upsert, sort, filter, removeAt, clear, reset }] = useList([1, 2, 3, 4, 5]);

  return (
    <div>
      <button onClick={() => set([1, 2, 3])}>Set to [1, 2, 3]</button>
      <button onClick={() => push(Date.now())}>Push timestamp</button>
      <button onClick={() => updateAt(1, Date.now())}>Update value at index 1</button>
      <button onClick={() => remove(1)}>Remove element at index 1</button>
      <button onClick={() => filter(item => item % 2 === 0)}>Filter even values</button>
      <button onClick={() => sort((a, b) => a - b)}>Sort ascending</button>
      <button onClick={() => sort((a, b) => b - a)}>Sort descending</button>
      <button onClick={clear}>Clear</button>
      <button onClick={reset}>Reset</button>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};
```

## Reference
```ts
import {useList} from "react-use";

const [list, { 
    set, 
    push, 
    updateAt, 
    insertAt, 
    update, 
    updateFirst,
    upsert, 
    sort, 
    filter, 
    removeAt, 
    remove, 
    clear, 
    reset 
}] = useList(array: any[] | ()=> any[]);
```

- **`list`**_`: T{}`_ &mdash; current list;
- **`set`**_`: (list: T[]) => void;`_ &mdash; Set new list instead old one;
- **`push`**_`: (...items: T[]) => void;`_ &mdash; Add item(s) at the end of list;
- **`updateAt`**_`: (index: number, item: T) => void;`_ &mdash; Replace item at given position. If item at given position not exists it will be set;
- **`insertAt`**_`: (index: number, item: T) => void;`_ &mdash; Insert item at given position, all items to the right will be shifted;
- **`update`**_`: (predicate: (a: T, b: T) => boolean, newItem: T) => void;`_ &mdash; Replace all items that matches predicate with given one;
- **`updateFirst`**_`: (predicate: (a: T, b: T) => boolean, newItem: T) => void;`_ &mdash; Replace first item matching predicate with given one;
- **`upsert`**_`: (predicate: (a: T, b: T) => boolean, newItem: T) => void;`_ &mdash; Like `updateFirst` but in case of predicate miss - pushes item to the list;
- **`sort`**_`: (compareFn?: (a: T, b: T) => number) => void;`_ &mdash; Sort list with given sorting function;
- **`filter`**_`: (callbackFn: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any) => void;`_ &mdash; Same as native Array's method;
- **`removeAt`**_`: (index: number) => void;`_ &mdash; Removes item at given position. All items to the right from removed will be shifted;
- **`remove`**_`: (index: number) => void;`_ &mdash; _**DEPRECATED:**_ Use removeAt method instead;
- **`clear`**_`: () => void;`_ &mdash; Make the list empty;
- **`reset`**_`: () => void;`_ &mdash; Reset list to initial value;

## Related hooks

- [useUpsert](./useUpsert.md)
