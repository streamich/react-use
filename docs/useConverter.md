# `useConverter`

React state hook that keeps track of the input 
and immediately generates the output based on the converter function.

## Usage

```jsx
import { useConverter } from 'react-use';

const Demo = () => {
  const [input, setInput, output] = useConverter((data) => btoa(data), 'Hello World');

  return (
    <div>
      <textarea value={input} onChange={(event) => setInput(event.target.value)} />
      <pre>{output}</pre>
    </div>
  );
};
```
