# `useVibrate`

React UI hook to provide physical feedback with device vibration hardware using the [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API).

## Usage

```jsx
import {useVibrate} from 'react-use';

const Demo = () => {
  const [vibrating, toggleVibrating] = useToggle(false);

  useVibrate(vibrating, [300, 100, 200, 100, 1000, 300], false);

  return (
    <div>
      <button onClick={toggleVibrating}>{vibrating ? 'Stop' : 'Vibrate'}</button>
    </div>
  );
};
```

## Reference

```ts
useVibrate(
  enabled: boolean = true,
  pattern: number | number[] = [1000, 1000],
  loop: boolean = true
): void;
```
