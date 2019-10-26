# `useStateHistory`

Stores defined amount of previous state values and provides handles to travel through them.

## Usage

## Reference

```typescript
const [state, setState, stateHistory] = useStateHistory<S = undefined>(
  initialState?: S | (()=>S),
  initialHistory?: S,
  historyCapacity?: number = 0
);
```

- **`state`**, **`setState`** and **`initialState`** are exactly the same with native React's `useState` hook;
- **`historyCapacity`** - amount of history entries that hold by storage;
- **`initialHistory`** - if defined it will be used as initial history value, otherwise history will equals `[ initialState ]`.  
If entries amount is greater than `historyCapacity` parameter it wont be modified on init but will be trimmed on next `setState`;
- **`stateHistory`** - an object containing history state:
    - **`history`**_`: S[]`_ - an array holding history entries;
    - **`position`**_`: number`_ - current position _index_ in history;
    
