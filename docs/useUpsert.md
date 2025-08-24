# `useUpsert`

> **⚠️ DEPRECATED**  
> This hook is deprecated and will be removed in a future version.  
> Use `useList` hook's `upsert` action instead.

This hook was a superset of [`useList`](./useList.md) that provided an additional method to upsert (update or insert) an element into the list. The same functionality is now available directly in `useList`.

## Migration Guide

Replace:
```jsx
import { useUpsert } from 'react-use';
const [list, { set, upsert, remove }] = useUpsert(comparisonFunction, initialItems);
```

With:
```jsx
import { useList } from 'react-use';
const [list, { set, upsert, removeAt }] = useList(initialItems);
// Use upsert(comparisonFunction, newItem) instead of upsert(newItem)
```

## Usage

```jsx
import {useUpsert} from 'react-use';

const Demo = () => {
  const comparisonFunction = (a: DemoType, b: DemoType) => {
    return a.id === b.id;
  };
  const [list, { set, upsert, remove }] = useUpsert(comparisonFunction, initialItems);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {list.map((item: DemoType, index: number) => (
        <div key={item.id}>
          <input value={item.text} onChange={e => upsert({ ...item, text: e.target.value })} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => upsert({ id: (list.length + 1).toString(), text: '' })}>Add item</button>
      <button onClick={() => set([])}>Reset</button>
    </div>
  );
};
```

## Related hooks

- [useList](./useList.md)
