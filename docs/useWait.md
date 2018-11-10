# `useWait`

`useWait` is a React Hook helps to manage multiple loading states on the page without any conflict. It's based on a very simple idea that manages an `Array` of multiple loading states. The built-in `Wait` component listens its registered loader and immediately become loading state.

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
      <Wait on="creating user" fallback={<div>Creating user!</div>}>
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
