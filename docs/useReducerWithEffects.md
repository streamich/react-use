# `useReducerWithEffects`

Hook that allows you to return side effects along with state transitions in your reducer

## Usage

```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {state: {count: state.count + 1},
              documentTitle: "New Title"};
    case 'decrement':
      return {state: {count: state.count - 1},
              log: "Decremented"};
    default:
      throw new Error();
  }
}

const handlers = { log: (dispatch, payload) => console.log(payload), 
                   documentTitle: (dispatch, payload) => document.title = payload}

function Counter() {
  const [state, dispatch] = useReducerWithEffects(reducer, handlers, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```