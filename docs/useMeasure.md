# `useMeasure`

React sensor hook that tracks dimensions of an HTML element using the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Usage

```jsx
import { useMeasure } from "react-use";

const Demo = () => {
  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();

  return (
    <div ref={ref}>
      <div>x: {x}</div>	
      <div>y: {y}</div>
      <div>width: {width}</div>
      <div>height: {height}</div>
      <div>top: {top}</div>
      <div>right: {right}</div>
      <div>bottom: {bottom}</div>
      <div>left: {left}</div>
    </div>
  );
};
```

This hook uses [`ResizeObserver` API][resize-observer], if you want to support 
legacy browsers, consider installing [`resize-observer-polyfill`][resize-observer-polyfill] 
before running your app. 

```js
if (!window.ResizeObserver) {
  window.ResizeObserver = (await import('resize-observer-polyfill')).default;
}
```


## Related hooks

- [useSize](./useSize.md)


[resize-observer]: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
[resize-observer-polyfill]: https://www.npmjs.com/package/resize-observer-polyfill
