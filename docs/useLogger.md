# `useLogger`

React lifecycle hook that logs in console as component transitions through life-cycles.

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
Demo mounted
Demo props updated {}
Demo un-mounted
```


## Reference

```js
useLogger(name, props);
```

- `name` &mdash; component name.
- `props` &mdash; latest props.
