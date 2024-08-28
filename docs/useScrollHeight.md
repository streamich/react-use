# `useScrollHeight`

Hook that returns the actual scroll height of a given block.

## Usage

```jsx
const Demo = () => {
  const elRef = React.useRef(null);
  const scrollHeight = useScrollHeight(elRef);

  return (
    <div>
      {scrollHeight === 0 ? `Element has no scroll height` : `Element's scroll height is ${scrollHeight}px`}
    </div>
  );
};
```

## Reference

```typescript
const scrollHeight: number = useScrollHeight(ref: React.RefObject<HTMLElement> | null);
```
