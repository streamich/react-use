# `useCopyToClipboard`

Copy text to a user's clipboard.


## Usage

Basic usage

```jsx
const Demo = () => {
  const [text, setText] = React.useState('');
  const [copied, copyToClipboard] = useCopyToClipboard(text);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="button" onClick={copyToClipboard}>copy text</button>
      <div>Copied: {copied ? 'Yes' : 'No'}</div>
    </div>
  )
}
```

## Reference

```js
const [copied, copyToClipboard] = useCopyToClipboard(text);
const [copied, copyToClipboard] = useCopyToClipboard(text, copyFunction);
```

, where

- `copyFunction` &mdash; function that receives a single string argument, which
  it copies to user's clipboard.
