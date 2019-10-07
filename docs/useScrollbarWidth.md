# `useScrollbarWidth`

React helper hook that helps to detect scrollbar width in pixels.

## Usage

```jsx
import { useScrollbarWidth } from 'react-use';

const Demo = () => {
  const width = useScrollbarWidth();

  return <div>Scrollbar width: {width}px</div>;
};
```

## Reference

```ts
const width: number | undefined = useScrollbarWidth();
```
