# `useGlobalState`

A React hook which creates a globally shared state.

## Usage


```ts
const useGlobalState = createGlobalState<T>(defaultValue: T)
...
const [ value, setValue ] = useGlobalState(initialValue?: T)
```

Here you can see that there is both a `defaultValue` and an `initialValue`. Together, they dictate what the starting value will be.
* `defaultValue` is the value returned on the first use of the `useGlobalState()` hook when no `initialValue` is provided, and allows you to ensure that there will always be valid value available.
* `initialValue` allows overriding the `defaultValue` on the very first rendering of the hook within the app. This also allows the hook to be a drop in replacement for `React.useState`. If no `initialValue` is provided, the `defaultValue` will be used.

### Example:

In the following example, the starting value with be `1`, because it overrides the `defaultValue`, and because that invocation is rendered before the `useGlobalValue(2)`, and `useGlobalValue(3)`, whose `initialValue` parameters are ignored because they are not the first invocations.

```tsx
const useMyGlobalState = createGlobalState<number>(0);

const SetValueDirectly: FC = () => {
  const [value, setValue] = useMyGlobalState(2);

  return (
    <div>
      <p>{value}</p>
      <div>
        <button onClick={() => setValue(value + 1)}>+</button>
        <button onClick={() => setValue(value - 1)}>-</button>
      </div>
    </div>
  );
};

const SetValueWithFunctionalUpdate: FC = () => {
  const [value, setValue] = useMyGlobalState(1);

  return (
    <div>
      <p>{value}</p>
      <div>
        <button onClick={() => setValue(val => val + 1)}>+</button>
        <button onClick={() => setValue(val => val - 1)}>-</button>
      </div>
    </div>
  );
};

const Demo: FC = () => {
  const [value] = useGlobalValue(1);
  return (
    <div>
      <p>{value}</p>
      <SetValueDirectly />
      <SetValueWithFunctionalUpdate />
    </div>
  );
};
```
