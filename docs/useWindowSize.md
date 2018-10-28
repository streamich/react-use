# `useWindowSize`

React sensor hook that tracks dimensions of the browser window.

[![](https://img.shields.io/badge/demo-useWindowSize-green.svg)](https://codesandbox.io/s/m7ln22668)


## Usage

```jsx
import {useWindowSize} from 'react-use';

const Demo = () => {
  const {width, height} = useWindowSize();

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};
```
