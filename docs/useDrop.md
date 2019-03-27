# `useDrop`

Triggers on file, link drop and copy-paste onto the page.


## Usage

```jsx
import {useDrop} from 'react-use';

const Demo = () => {
  const state = useDrop({
    onFiles: files => console.log('files', files),
    onUri: uri => console.log('uri', uri),
    onText: text => console.log('text', text),
  });

  return (
    <div>
      Drop something on the page.
    </div>
  );
};
```
