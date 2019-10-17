# `useSearchParam`

React hook that updates browser's location search param based off of an input.

## Usage

```jsx
import { useSearchParamInput } from 'react-use'
import { useHistory } from 'react-router-dom'

const Demo = () => {
  const history = useHistory()
  const [value, setValue] = useSearchParamInput('input', '', {
    onUpdate: history.replace,
  })

  return <input value={value} onChange={e => setValue(e.target.value)} />
}
```
