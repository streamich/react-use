# `useDefault`

React state hook that returns the default value when state is null or undefined.

## Usage

```jsx
import {useDefault} from 'react-use';

const Demo = () => {
  const initialUser = { name: 'Marshall' }
  const defaultUser = { name: 'Mathers' }
  const [user, setUser] = useDefault(defaultUser, initialUser);

  return (
    <div>
      <div>User: {user.name}</div>
      <input onChange={e => setUser({ name: e.target.value })} />
      <button onClick={() => setUser(null)}>set to null</button>
    </div>
  );
};
```
