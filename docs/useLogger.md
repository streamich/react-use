# `useLogger`

React lifecycle hook that console logs parameters as component transitions through lifecycles.

## Usage

```jsx
import {useLogger} from 'react-use';

const Demo = (props) => {
  useLogger('Demo', props);
  return null;
};
```

## Example Output

```
Demo mounted {}
Demo updated {}
Demo unmounted
```

## Reference

```js
useLogger(componentName: string, ...rest);
```

- `componentName` &mdash; component name.
- `...rest` &mdash; parameters to log.
