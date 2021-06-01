# `useWakeLock`

React sensor hook that keeps sceen on using system wakeLock.

## Usage

```jsx
import { useWakeLock } from "react-use";

const Demo = () => {
  const [status, error, requestLock, releaseLock] = useWakeLock({
    timeOut: 5000, // default 1 hour
    lockOnLoad: true, // default false
    lockOnVisible: true, // default false
  });

  return (
    <div>
      <div>Lock status: {status}</div>
      <div>Lock error: {error}</div>
      <button
        onClick={() => {
          if (status === "acquired") {
            releaseLock();
          } else {
            requestLock();
          }
        }}
      >
        {status === "acquired" ? "Acquired Lock" : "Get Lock"}
      </button>
    </div>
  );
};
```
