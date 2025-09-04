# `useDocumentTitle`

React hook that updates the `document.title` when the component mounts or when the title changes.  
It also restores the previous title on unmount.

## Usage

```jsx
import { useDocumentTitle } from 'react-use';

const Demo = () => {
  const [count, setCount] = React.useState(0);

  useDocumentTitle(`Clicked ${count} times`);

  return (
    <div>
      <h3>Click the button to update document title</h3>
      <button onClick={() => setCount(c => c + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
};
```

## Reference

```ts
useDocumentTitle(title);
```
