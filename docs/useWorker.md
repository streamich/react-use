# `useWorker`

React sensor hook that tracks Web Worker state

## Usage

```jsx
import { useWorker } from "react-use";

const Demo = () => {
  const { instance, data, error, isLoading } = useWorker();

  useEffect(() => {
    instance.postMessage("hello");
  }, [instance]);

  return (
    <div>
      <div>{isLoading ? data : "loading"}</div>
    </div>
  );
};
```
