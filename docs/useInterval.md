# `useInterval`

React hook that allow you using declarative setInterval.

## Usage

```jsx
import * as React from 'react';
import { useInterval } from 'react-use';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(1000);

  useInterval(() => {
    setCount(count + 1);
  }, delay);

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  return (
    <div>
      <div>
        delay: <input type="text" value={delay} onChange={handleDelayChange} />
      </div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={() => setDelay(null)}>stop</button>
      </div>
    </div>
  );
};
```


## Reference

```js
useInterval(fn, delay?: number)
```
