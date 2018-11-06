# `useWait`

React waiting management hook.

## Usage

```jsx
import { useWait } from 'react-use'

function UserCreateButton() {
  const { startWaiting, endWaiting, isWaiting, Wait } = useWait();

  return (
    <button
      onClick={() => startWaiting("creating user")}
      disabled={isWaiting("creating user")}
    >
      <Wait message="creating user" waiting={<div>Creating user!</div>}>
        Create User
      </Wait>
    </button>
  );
}
```

And you should wrap your `App` with `Waiter` component. It's actually a `Context.Provider` that provides a loading context to the component tree.

```jsx
const rootElement = document.getElementById("root");
ReactDOM.render(
  <useWait.Waiter>
    <App />
  </useWait.Waiter>,
  rootElement
);
```
