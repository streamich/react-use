# `useStartTyping`

React sensor hook that fires a callback when user starts typing. Can be used
to focus default input field on the page.

## Usage

```jsx
import {useStartTyping} from 'react-use';

const Demo = () => {
  useStartTyping(() => alert('Started typing...'));

  return null;
};
```
