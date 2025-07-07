# `useWindowSize`

React sensor hook that tracks dimensions of the browser window.


## Usage

```jsx
import {useWindowSize} from 'react-use';

const Demo = () => {
  const {width, height} = useWindowSize();

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};
```

## Reference

```js
useWindowSize(options);
```

- `initialWidth` — Initial width value for non-browser environments.
- `initialHeight` — Initial height value for non-browser environments.
- `onChange` — Callback function triggered when the window size changes.

## Related hooks

- [useSize](./useSize.md)
- [useMeasure](./useMeasure.md)