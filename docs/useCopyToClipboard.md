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
}
```

## Reference

```js
const [{value, error, noUserInteraction}, copyToClipboard] = useCopyToClipboard(mimeType);
```

- `mimeType` &mdash; the MIME type of what you want to copy as. Use `text/html` to copy as HTML, `text/plain` to avoid inherited styles showing when pasted into rich text editor. Defaults to `text/plain`
- `value` &mdash; value that was copied to clipboard, undefined when nothing was copied.
- `error` &mdash; caught error when trying to copy to clipboard.
- `noUserInteraction` &mdash; boolean indicating if user interaction was required to copy the value to clipboard to expose full API from underlying [`copy-to-clipboard`](https://github.com/sudodoki/copy-to-clipboard) library.
