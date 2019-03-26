# `useCss`

React UI hook that changes [CSS dynamically][gen-5]. Works like "virtual CSS" &mdash;
it re-renders only CSS rules that change. It is different from inline styles, because
you can use media queries and pseudo selectors.


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


## Examples

```js
const className = useCss({
  color: 'tomato',
  '&:hover': {
    color: 'orange',
  },
});

const className = useCss({
  svg: {
    fill: 'tomato',
  },
  '.global_class &:hover svg': {
    fill: 'orange',
  },
});

const className = useCss({
  color: 'tomato',
  '@media only screen and (max-width: 600px)': {
    color: 'orange',
    '&:hover': {
      color: 'red',
    }
  },
});
```

[gen-5]: https://github.com/streamich/freestyler/blob/master/docs/en/generations.md#5th-generation
