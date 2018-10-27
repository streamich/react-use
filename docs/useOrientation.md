# `useOrientation`

React sensor hook that tracks screen orientation of user's device.

Returns state in the following shape

```js
{
  angle: 0,
  type: 'landscape-primary'
}
```


## Usage

```jsx
import {useOrientation} from 'react-use';

const Demo = () => {
  const state = useOrientation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
