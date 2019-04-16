# `useForceUpdate`

React hook that returns a function to trigger a manual re-render of a component

## Usage

```jsx
import { useForceUpdate } from 'react-use'

const Demo = () => {
  const forceUpdate = useForceUpdate()

  return (
    <div>
      {Math.random()}
      <button onClick={forceUpdate}>Force update</button>
    </div>
  )
}
```
