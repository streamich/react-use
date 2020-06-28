# `useImage`

Hook that loads an image and provides various information, e.g. whether the image has been loaded.

## Usage

```jsx
const Demo = () => {
  const imageSrc = 'https://via.placeholder.com/150';

  const { hasLoaded, hasError } = useImage(imageSrc);

  if (hasError) {
    return null;
  }

  return (
    <div>
      {!hasLoaded && <>Loading...</>}
      {hasLoaded && <img src={imageSrc} />}
    </div>
  );
};
```

## Reference

```typescript
const {
    hasLoaded: boolean,
    hasError: boolean,
    hasStartedInitialFetch: boolean
} = useFetchImage(imageSrc: string);
```
