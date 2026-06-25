# `useMouseWheel` 
React Hook to indicate User is inactive for example to logout automatically. Time is in seconds

## Usage

```jsx
import { useMouseWheel } from 'react-use';

const Demo = () => {
  const timer = useInactive(8);
  if (timer == 0) {
      return <div>Logged Out</div>;
  }
  
  if (timer < 8) {
      return <div>In {timer} seconds you will be automatically logged out</div>;
  }
  return <div>Signed in</div>;
};
```
