# `useSetState`

React state hook that creates `setState` method which works similar to how
`this.setState` works in class components&mdash;it merges object changes into
current state.

Optionally you can pass second argument `callback`, which is called after render is finished, 
like `this.setState` has in class components.

Additionally can pass `currentState` parameter to callback parameter like: `(currentState) => ()`, which is updated state after render is finished.


## Usage

```jsx
import {useSetState} from 'react-use';

const Demo = () => {
  const [state, setState] = useSetState({});

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({hello: 'world'})}>hello</button>
      <button onClick={() => setState({foo: 'bar'})}>foo</button>
      <button 
        onClick={() => {
          setState((prevState) => ({
            count: (prevState.count || 0) + 1,
          }))
        }}
      >
        count
      </button>

      <button
        onClick={() =>
          setState({ test: 'test text' }, (currentState) => {
            console.log('call after render', currentState);
          })
        }
      >
        test
      </button>
    </div>
  );
};
```

## Reference

```js
const [state, setState] = useSetState({cnt: 0});

setState({cnt: state.cnt + 1});
setState((prevState) => ({
  cnt: prevState + 1,
}));

setState({cnt: state.cnt + 1}, () => console.log('call after render finishes'));
setState((prevState) => ({
  cnt: prevState + 1,
}), () => console.log('call after render finishes'));

// If you want to acces updated state you should pass parameter to callback
setState({cnt: state.cnt + 1}, (currentState) => console.log('call after render finishes', currentState));

```
