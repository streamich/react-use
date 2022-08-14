# `useGlobalState`

A React hook that creates a globally shared state.

## Usage

```tsx
import React from 'react';

const useGlobalValue = createGlobalState<number>(0);

const CompA: React.FC = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value + 1)}>+</button>;
};

const CompB: React.FC = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value - 1)}>-</button>;
};

const Demo: React.FC = () => {
  const [value] = useGlobalValue();
  return (
    <div>
      <p>{value}</p>
      <CompA />
      <CompB />
    </div>
  );
};
```

It also allows initializing the state with a function and using a function in the setState:

```tsx
import React from 'react';

const useGlobalValue = createGlobalState<number>(() => 0);

const CompA: React.FC = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value => value + 1)}>+</button>;
};

const CompB: React.FC = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value => value - 1)}>-</button>;
};

const Demo: React.FC = () => {
  const [value] = useGlobalValue();
  return (
    <div>
      <p>{value}</p>
      <CompA />
      <CompB />
    </div>
  );
};
```
