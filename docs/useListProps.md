# `useListProps`

React hook that return array of value for each item of a list.
The value reference change only if the dependencies or the item reference changed.
It can be used to be sure that props passed to an item of a rendered list doesn't mutate when it is not needed.

## Usage

```jsx
import React from 'react';
import { useListProps } from 'react-use';

const Item = React.memo(({
  checked,
  onClick,
  label
}) => (
  <div>
    <input
      type="checkbox"
      onChange={onClick}
      checked={checked}
    />
    <span>{label}</span>
  </div>
));

const TodoApp = () => {
  const [items, setItems] = React.useState([
    { label: 'Learn JavaScript', checked: false },
    { label: 'Learn React', checked: false },
    { label: 'Build something awesome', checked: true }
  ]);

  const handleItemClick = React.useCallback(item => {
    setItems(items =>
      items.map(currentItem => currentItem === item
        ? { ...item, checked: !item.checked }
        : currentItem
      )
    )
  }, [setItems]);

  const listProps = useListProps(
    (item) => ({
      onClick: () => handleItemClick(item)
    }),
    items,
    [handleItemClick]
  );

  return (
    <div>
      <h2>Todos: </h2>
      <ol>
        {items.map((item, index) => (
          <Item
            key={item.label}
            // This reference will change only when `item` or `handleItemClick` reference changed
            onClick={listProps[index].onClick}
            {...item}
          />
        ))}
      </ol>
    </div>
  );
}
```

## Reference

```ts 
const props: C[] = useListProps<T, C>(
  creator: (item: T, index: number, items: T[]) => C,
  items: T[],
  deps: React.DependencyList
);
```
- `props` - array of result returned by creator
- `creator` - function that create property for a given item
- `items` - list of items
- `deps` - dependencies for every properties creation
