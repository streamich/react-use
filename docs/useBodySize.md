# `useBodySize`

React sensor hook that tracks dimensions of HTML body using the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Usage

```jsx
import { useBodySize } from 'react-use';

const Demo = () => {
  const { width, height } = useBodySize();

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};
```

Consider installing [`resize-observer-polyfill`][resize-observer-polyfill] to support legacy browsers. 

```js
if (!window.ResizeObserver) {
  window.ResizeObserver = (await import('resize-observer-polyfill')).default;
}
```

[resize-observer]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
[resize-observer-polyfill]: https://www.npmjs.com/package/resize-observer-polyfill
