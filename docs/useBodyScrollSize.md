# `useBodyScrollSize`

React sensor hook that tracks dimensions of the document body scroll


## Usage

```jsx
import {useBodyScrollSize} from 'react-use';

const Demo = () => {
  const {width, height} = useBodyScrollSize();

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};
```
