# `useLocalSyncedState`

React hook that creates a state that can be synced between contexts on the same browser running on the same machine: tabs, windows, iframes can keep the value of a state synced between them.

A state must have an identifier, and any other state with the same identifier will keep synced to it.

It can be either a receiver: will be updated from other states but won't update others itself; sender: will update other states but won't be updated; both: will update and be updated.

Underneath it uses BroadcastChannel to communicate between contexts.

## Usage

```tsx
import { useLocalSyncedState } from 'react-use';

const Demo = () => {
  const [value, setValue] = useLocalSyncedState('value', 0);

  return (
    <div>
      Value: {value}
      <button onClick={() => setValue(value + 1)}>Increase!</button>
    </div>
  );
};
```


## Reference

```ts
type Role = 'receiver' | 'sender' | 'both';
useLocalSyncedState<T>(identifier: string, baseValue: T | null, role: Role): [T, (T) => void];
```

- `identifier` &mdash; unique idenifier shared between all states to be synced.
- `baseValue` &mdash; base value to be given to the state.
- `role` &mdash; role of this instance: receiver, will be updated from other states but won't update others itself; sender: will update other states but won't be updated; both: will update and be updated.
