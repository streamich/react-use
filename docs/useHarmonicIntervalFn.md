# `useHarmonicIntervalFn`

Same as [`useInterval`](./useInterval.md) hook, but triggers all effects with the same delay
at the same time.

For example, this allows you to create ticking clocks on the page which re-render second counter
all at the same time.


## Reference

```js
useHarmonicIntervalFn(fn, delay?: number)
```
