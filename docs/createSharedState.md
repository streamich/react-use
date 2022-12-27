# `useSharedState`

A React hook that creates a globally shared state via useSyncExternalStore.

## Usage

```tsx
const useCounter = createSharedState<number>(0);

const CompA: FC = () => {
  const [value, setValue] = useCounter();

  return <button onClick={() => setValue(value + 1)}>+</button>;
};

const CompB: FC = () => {
  const [value, setValue] = useCounter();

  return <button onClick={() => setValue(value - 1)}>-</button>;
};

const Demo: FC = () => {
  const [value] = useCounter();
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
const useCounter = createSharedState<number>(() => 0);

const CompA: FC = () => {
  const [value, setValue] = useCounter();

  return <button onClick={() => setValue(value => value + 1)}>+</button>;
};

const CompB: FC = () => {
  const [value, setValue] = useCounter();

  return <button onClick={() => setValue(value => value - 1)}>-</button>;
};

const Demo: FC = () => {
  const [value] = useCounter();
  return (
    <div>
      <p>{value}</p>
      <CompA />
      <CompB />
    </div>
  );
};
```

Support selector function to optimize performance:

```tsx
const useCounter = createSharedState<number>(() => { value1: 0, value2: 0 });

const CompA: FC = () => {
  const [value, setValue] = useCounter((counter) => counter.value1);
  // If the value2 is updated, then the component will not be updated
  return <button onClick={() => setValue(value => ({
    value1: value.value1 + 1,
    value2: value.value2,  
  }))}>+</button>;
};

const CompB: FC = () => {
  const [value, setValue] = useCounter((counter) => counter.value2);
  // If the value1 is updated, then the component will not be updated
  return <button onClick={() => setValue(value => ({
    value1: value.value1,
    value2: value.value2 - 1,  
  }))}>+</button>;
};

const Demo: FC = () => {
  const [value] = useCounter();
  return (
    <div>
      <p>{value.value1}</p>
      <p>{value.value2}</p>
      <CompA />
      <CompB />
    </div>
  );
};
```
