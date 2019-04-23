# `useResizeObserver`

React sensor hook that tracks the dimensions of an HTML element using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Usage

```jsx
import useResizeObserver from 'react-use/lib/useResizeObserver'

const Demo = () => {
  const ref = useRef(null)
  const { width, height } = useResizeObserver(ref)

  return (
    <div>
      <div style={{ border: '1px solid red' }} ref={ref}>
        Size me up! ({width}px)
      </div>
    </div>
  )
}
```
