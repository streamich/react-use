# `useSpeech`

React UI hook that synthesizes human voice that speaks a given string.

[![](https://img.shields.io/badge/demo-useSpeech-green.svg)](https://codesandbox.io/s/n090mqz69m)


## Usage

```jsx
import {useSpeech} from 'react-use';

const Demo = () => {
  const state = useSpeech('Hello world!');

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>  
  );
};
```
