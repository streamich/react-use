# `useConditionalEffect` and `useConditionalLayoutEffect`

An effect hook that will only run ifa boolean is true.

## Usage

```jsx
import { useConditionalEffect, useConditionalLayoutEffect } from "react-use";

const CheckIfSomethingIsLoaded = () => {
  const [isLoaded, value] = useSomeCustomLoader();

  useConditionalEffect(
    isLoaded,
    () => {
      doSomethingWithValue(value);
    },
    [value]
  );

  return <div>{isLoaded ? <div>{value}</div> : null}</div>;
};

const CheckIfFeatureIsEnabled = () => {
  const [isEnabled] = useFeatureIsEnabled();

  useConditionalEffect(
    isEnabled,
    () => {
      enableFeature();
    },
    [value]
  );

  return <div>{isEnabled ? <div>Important Feature Things</div> : null}</div>;
};
```

## Reference

```ts
useConditionalEffect(condition: boolean, effect: () => void | (() => void | undefined), deps: any[]);
```
