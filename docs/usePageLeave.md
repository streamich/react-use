# `usePageLeave`

React sensor hook that fires a callback when mouse leaves the page.

## Usage

```jsx
import {usePageLeave} from 'react-use';

const Demo = () => {
  usePageLeave(() => console.log('Page left...'));

  return null;
};
```
