# `useStateHistory`

Stores defined amount of previous state values and provides handles to travel through them.

## Usage

## Reference

```typescript
const [state, setState, stateHistory] = useStateWithHistory<S = undefined>(
  initialState?: S | (()=>S),
  historyCapacity?: number = 10,
  initialHistory?: S
);
```

- **`state`**, **`setState`** and **`initialState`** are exactly the same with native React's `useState` hook;
- **`historyCapacity`** - amount of history entries that hold by storage;
- **`initialHistory`** - if defined it will be used as initial history value, otherwise history will equals `[ initialState ]`.  
Initial state will not be pushed to initial history.  
If entries amount is greater than `historyCapacity` parameter it wont be modified on init but will be trimmed on next `setState`;
- **`stateHistory`** - an object containing history state:
    - **`history`**_`: S[]`_ - an array holding history entries. _I will have the same ref all the time so pe careful with that one!_;
    - **`position`**_`: number`_ - current position _index_ in history;
    - **`capacity`**_`: number = 10`_ - maximum amount of history entries;
    - **`back`**_`: (amount?: number) => void`_ - go back in state history, it will cause `setState` invoke and component re-render.  
    If first element of history reached, the call will have no effect;
    - **`forward`**_`: (amount?: number) => void`_ - go forward in state history, it will cause `setState` invoke and component re-render.  
    If last element of history reached, the call will have no effect;
    - **`go`**_`: (position: number) => void`_ - go to arbitrary position in history.  
    In case `position` is non-negative ot will count elements from beginning.
    Negative `position` will cause elements counting from the end, so `go(-2)` equals `go(history.length - 1)`;
    
