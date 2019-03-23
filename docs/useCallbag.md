# `useCallbag`

React state hook that tracks the latest value of a callbag.

Requires `use-callbag`:
```bash
npm add use-callbag
# or
yarn add use-callbag
```

## Usage

```jsx
import {useCallbag} from 'react-use';
import interval from 'callbag-interval';

const Demo = () => {
  const count = useCallbag(() => interval(1000));
  return <span>{`Counter: ${count}`}</span>
};
```
