# `useNetwork`

React sensor hook that tracks connected hardware devices. Returns:

```json
{
  "online": true,
  "since": "2018-10-27T08:59:05.562Z",
  "downlink": 10,
  "effectiveType": "4g",
  "rtt": 50
}
```

## Usage

```jsx
import {useNetwork} from 'react-use';

const Demo = () => {
  const state = useNetwork();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```
