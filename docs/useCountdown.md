# `useCountdown`

The countdown.

## Usage

```tsx
const Demo = () => {
  const [countdown1, action1] = useCountdown(6);
  const [countdown2, action2] = useCountdown(60);
  return (
    <div>
      <div>countdown1: {countdown1}</div>
      <br />
      <button onClick={action1.start}>start</button>
      <button onClick={action1.stop}>stop</button>
      <button onClick={action1.pause}>pause</button>
      <br />
      <br />
      <div>countdown2: {countdown2}</div>
      <br />
      <button onClick={action2.start}>start</button>
      <button onClick={action2.stop}>stop</button>
      <button onClick={action2.pause}>pause</button>
    </div>
  );
};
```

## Reference

```ts
interface CountDownAction {
  start: () => void;
  stop: () => void;
  pause: () => void;
}
const useCountDown = (initialValue: number): [number | null, CountDownAction]
```

- `start` - start a countdown or continue the paused countdown
- `stop` - stop a countdown and reset to `0`
- `pause` - pause a countdown and you can continue via `start()`
