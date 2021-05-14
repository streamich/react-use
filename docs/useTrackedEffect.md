# `useTrackedEffect`

React lifecycle hook that runs an effect and pass indexes of changed dependencies into callback function, for tracking, further processing,...

## Usage

```jsx
import {useTrackedEffect, useTimeoutFn} from 'react-use';

const [deps, setDeps] = React.useState({
    dep1: 0,
    dep2: 0,
    dep3: 0,
  });
  useTrackedEffect(
    (changedDeps) => {
      console.log(`There're ${changedDeps.length} changed dependencies.`);
      console.log(`Indexes of changes:`, changedDeps);

      return () => {
        console.log('Running clean-up of effect on unmount');
      };
    },
    [deps.dep1, deps.dep2, deps.dep3]
  );
  useTimeoutFn(() => {
    console.log('Start change dep 1 and dep 2');
    setDeps({
      ...deps,
      dep1: 1,
      dep2: 1,
    });
  }, 1000);
```

## Reference

```js
useTrackedEffect(effect: Function, deps: DependencyList);
```
