# `useWindowSize`

React sensor hook that tracks dimensions of the browser window.


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

## Options

**`initialWidth`**
Fallback width, used when `window` global is `undefined`. For example, this will be used during a server render.

**`initialHeight`**
Fallback height, used when `window` global is `undefined`. For example, this will be used during a server render.

**`skip`**
If `true`, changes to window dimensions will be ignored.
