# `useCss`

React side-effect hook that changes [CSS dynamically][gen-5].


## Usage

```jsx
import {useCss} from 'react-use';

const Demo = () => {
  const className = useCss({
    color: 'red',
    border: '1px solid red',
    '&:hover': {
      color: 'blue',
    },
  });

  return (
    <div className={className}>
      Hover me!
    </div>
  );
};
```

[gen-5]: https://github.com/streamich/freestyler/blob/master/docs/en/generations.md#5th-generation
