# `createGlobalEventBus`

Creates a hook for emitting and listening to events in a global event bus.
Similar to Redux' actions, but more lightweight.

## Usage

```tsx
type MyEvent = number;

const useEventBus = createGlobalEventBus<MyEvent>();

const CompA: FC = () => {
  const emit = useEventBus((event) => {
    console.log('an event was emitted:', event);
  });

  return <p><button onClick={() => emit(Date.now())}>emit event</button></p>;
};

const CompB: FC = () => {
  const [count, setCount] = useState(0));

  useEventBus((event) => {
    setCount(c => c + 1);
  });

  return <p>Number of events emitted so far: {count}</p>;
};

const Demo: FC = () => {
  return (
    <div>
      <CompA />
      <CompB />
    </div>
  );
};
```
