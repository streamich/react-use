# `useResizeObserver`

React sensor hook that tracks the dimensions of an HTML element using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver). Returns a proxy that only updates the component when accessed properties change.

## Usage

```jsx
import { useResizeObserver } from 'react-use'

const Demo = () => {
  const ref = useRef(null)
  // Will only update when width changes
  const { width } = useResizeObserver(ref)

  return (
    <div>
      <div style={{ border: '1px solid red' }} ref={ref}>
        Size me up! ({width}px)
      </div>
      <div>width: {width}</div>
    </div>
  )
}
```
