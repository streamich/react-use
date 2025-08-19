# `useSleep`

Returns a sleep function that can be used multiple times, and safely cancels all timeouts when the component is removed.

## Usage

```jsx
import { useSleep } from 'react-use';

function TestComponent() {
  const [isReady, setReady] = React.useState(true);
  const sleep = useSleep();

  return (
    <div>
      {isReady && (
        <button
          onClick={async () => {
            setReady(false);
            await sleep(3000);
            setReady(true);
          }}>
          Please, click me!
        </button>
      )}
      {!isReady && <span>Thanks!</span>}
    </div>
  );
}

const Demo = () => {
  return (
    <div>
      <TestComponent />
    </div>
  );
};
```

## Reference

```ts 
const sleep: (ms: number)=>Promise<void> = useSleep();
```

- **`sleep`**_` :(ms: number)=>Promise<void>`_ - sleep function, will resolve after ms