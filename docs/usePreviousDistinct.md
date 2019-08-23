# `usePreviousDistinct`

Just like `usePrevious` but it will only update once the value actually changes. This is important when other
hooks are involved and you aren't just interested in the previous props version, but want to know the previous
distinct value

## Usage

```jsx
import {usePreviousDistinct, useCounter} from 'react-use';

const Demo = () => {
  const [count, { inc: relatedInc }] = useCounter(0);
  const [unrelatedCount, { inc }] = useCounter(0);
  const prevCount = usePreviousDistinct(count);

  return (
    <p>
      Now: {count}, before: {prevCount}
      <button onClick={() => relatedInc()}>Increment</button>
      Unrelated: {unrelatedCount}
      <button onClick={() => inc()}>Increment Unrelated</button>
    </p>
  );
};
```

You can also provide a way of identifying the value as unique. By default, a strict equals is used.

```jsx
import {usePreviousDistinct} from 'react-use';

const Demo = () => {
  const [str, setStr] = React.useState("something_lowercase");
  const [unrelatedCount] = React.useState(0);
  const prevStr = usePreviousDistinct(str, (prev, next) => (prev && prev.toUpperCase()) === next.toUpperCase());

  return (
    <p>
      Now: {count}, before: {prevCount}
      Unrelated: {unrelatedCount}
    </p>
  );
};
```

## Reference

```ts
const prevState = usePreviousDistinct = <T>(state: T, compare?: (prev: T | undefined, next: T) => boolean): T;
```
