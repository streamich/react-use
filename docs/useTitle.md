# `useTitle`

React side-effect hook that sets title of the page.


## Usage

```jsx
import {useTitle} from 'react-use';

const Demo = () => {
  useTitle('Hello world!');

  return null;
};
```
## Options

If `restoreOnUnmount` is true, when the parent component is unmounted, the page title will be reverted to the title before the hook was called.

```jsx
import {useTitle} from 'react-use';

const Demo = () => {
  useTitle('Hello world!', { restoreOnUnmount: true });

  return null;
};
```
