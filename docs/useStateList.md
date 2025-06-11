# `useStateList`

Provides handles for circular iteration over states list.  
Supports forward and backward iterations and arbitrary position set , and now supports initializing with default index.

## Usage

```jsx
import { useStateList } from 'react-use';
import { useRef } from 'react';

const stateSet = ['first', 'second', 'third', 'fourth', 'fifth'];
const defaultCurrentIndex = 2 ; // Start at 'third'

const Demo = () => {
  const { state, prev, next, setStateAt, setState, currentIndex, isFirst, isLast } = useStateList(stateSet , defaultCurrentIndex);
  const indexInput = useRef<HTMLInputElement>(null);
  const stateInput = useRef<HTMLInputElement>(null);

  return (
    <div>
      <pre>
        {state} [index: {currentIndex}], [isFirst: {isFirst}], [isLast: {isLast}]
      </pre>
      <button onClick={() => prev()}>prev</button>
      <br />
      <button onClick={() => next()}>next</button>
      <br />
      <input type="text" ref={indexInput} style={{ width: 120 }} />
      <button onClick={() => setStateAt((indexInput.current!.value as unknown) as number)}>set state by index</button>
      <br />
      <input type="text" ref={stateInput} style={{ width: 120 }} />
      <button onClick={() => setState(stateInput.current!.value)}> set state by value</button>
    </div>
  );
};
```

## Reference

```ts
const { state, currentIndex, prev, next, setStateAt, setState, isFirst, isLast } = useStateList<T>(stateSet: T[] = [] , defaultCurrentIndex?: number);
```

### Parameters

- **`stateSet`**_`: T[]`_ — List of possible states.
- **`defaultCurrentIndex`**_`: number`_ (optional) — The index to start from. Defaults to `0`. If out of bounds, it will be clamped to the valid range.

If `stateSet` changed, became shorter than before and `currentIndex` left in shrunk gap - the last element of list will be taken as current.

### Returns

- **`state`**_`: T`_ &mdash; current state value;
- **`currentIndex`**_`: number`_ &mdash; current state index;
- **`prev()`**_`: void`_ &mdash; switches state to the previous one. If first element selected it will switch to the last one;
- **`next()`**_`: void`_ &mdash; switches state to the next one. If last element selected it will switch to the first one;
- **`setStateAt(newIndex: number)`**_`: void`_ &mdash; set the arbitrary state by index. Indexes are looped, and can be negative.  
  _4ex:_ if list contains 5 elements, attempt to set index 9 will bring use to the 5th element, in case of negative index it will start counting from the right, so -17 will bring us to the 4th element.
- **`setState(state: T)`**_`: void`_ &mdash; set the arbitrary state value that exists in `stateSet`. _In case new state does not exists in `stateSet` an Error will be thrown._
- **`isFirst`**_`: boolean`_ &mdash; `true` if current state is the first one.
- **`isLast`**_`: boolean`_ &mdash; `true` if current state is the last one.
