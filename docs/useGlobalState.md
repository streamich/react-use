# `useGlobalState`

A React hook witch create a globally shared state.

## Usage

```jsx
import { useGlobalState } from "react-use";

const useGlobalValue = useGlobalState(0);

const CompA = () => {
  const [globalValue, setGlobalValue] = useGlobalValue();
  return (
    <div>
      <h3>CompA</h3>
      <a onClick={() => setGlobalValue(globalValue++)}>+</a>
      <span>{globalValue}</span>
    </div>
  );
};

const CompB = () => {
  const [globalValue, setGlobalValue] = useGlobalValue();
  return (
    <div>
      <h3>CompB</h3>
      <a onClick={() => setGlobalValue(globalValue--)}>-</a>
      <span>{globalValue}</span>
    </div>
  );
};

const CompC = () => {
  const [globalValue, setGlobalValue] = useGlobalValue();
  return (
    <div>
      <h3>CompC</h3>
      <span>{globalValue}</span>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <CompA></CompA>
      <CompB></CompB>
      <CompC></CompC>
    </div>
  );
};
```
