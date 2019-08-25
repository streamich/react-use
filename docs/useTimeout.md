# `useTimeout`

Re-renders the component after a specified number of milliseconds.  
Provides handles to cancel and/or reset the timeout.

## Usage

```jsx
import { useTimeout } from 'react-use';

function TestComponent(props: { ms?: number } = {}) {
  const ms = props.ms || 5000;
  const [isReady, cancel] = useTimeout(ms);

  return (
    <div>
      { isReady() ? 'I\'m reloaded after timeout' : `I will be reloaded after ${ ms / 1000 }s` }
      { isReady() === false ? <button onClick={ cancel }>Cancel</button> : '' }
    </div>
  );
}

const Demo = () => {
  return (
    <div>
      <TestComponent />
      <TestComponent ms={ 10000 } />
    </div>
  );
};
```

## Reference

```ts 
const [
    isReady: () => boolean | null,
    cancel: () => void,
    reset: () => void,
] = useTimeout(ms: number = 0);
```

- **`isReady`**_` :()=>boolean|null`_ - function returning current timeout state:
    - `false` - pending re-render
    - `true` - re-render performed
    - `null` - re-render cancelled
- **`cancel`**_` :()=>void`_ - cancel the timeout (component will not be re-rendered)
- **`reset`**_` :()=>void`_ - reset the timeout
