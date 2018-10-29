# `useSetState`

React state hook that creates `setState` method which works similar to how
`this.setState` works in class components&mdash;it merges object changes into
current state.


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
    </div>
  );
};
```
