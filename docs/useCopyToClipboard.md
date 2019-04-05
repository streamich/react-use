# `useCopyToClipboard`

copy text to a users clipboard.

## Usage

### basic usage:

```jsx
import {useCopyToClipboard} from 'react-use';

const myComp = (props) => {
  const [success, copyToClipboard] = useCopyToClipboard();
  const myText = 'text to be copied';
  return (
    <span onClick={ () => copyToClipboard(myText) }>{myText}</span>
    )
}
```

### with timeout:

```jsx
import {useCopyToClipboard} from 'react-use';

const myComp = (props) => {
  const [success, copyToClipboard] = useCopyToClipboard(2000);
  const myText = 'text to be copied';
  return (
    <div>
      <span onClick={ () => copyToClipboard(myText) }>{myText}</span>
      { success && <span>copied to clipboard</span>}
    </div>
    )
}
```

### with custom polyfill:

```jsx
import {useCopyToClipboard} from 'react-use';
import * as clipboard from "clipboard-polyfill"

const myComp = (props) => {
  const [success, copyToClipboard] = useCopyToClipboard(undefined, clipboard.writeText);
  const myText = 'text to be copied';
  return (
    <div>
      <span onClick={ () => copyToClipboard(myText) }>{myText}</span>
      { success && <span>copied to clipboard</span>}
    </div>
    )
}
```
