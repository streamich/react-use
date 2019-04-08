# `useCopyToClipboard`

Copy text to a user's clipboard.

## Usage

```jsx
const Demo = () => {
  const [text, setText] = React.useState('');
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="button" onClick={() => copyToClipboard(text)}>copy text</button>
      {state.error
        ? <p>Unable to copy value: {state.error.message}</p>
        : state.value && <p>Copied {state.value}</p>}
    </div>
  )

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
const [state, copyToClipboard] = useCopyToClipboard();
```
