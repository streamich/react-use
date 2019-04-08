import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ShowDocs from './util/ShowDocs';
import {useCopyToClipboard} from '..';

const Demo = () => {
  const [text, setText] = React.useState('');
  const [copied, copyToClipboard] = useCopyToClipboard(text, {
    onCopy: txt => alert('success: ' + txt),
    onError: err => alert(err),
  });

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="button" onClick={copyToClipboard}>copy text</button>
      <div>Copied: {copied ? 'Yes' : 'No'}</div>
      <div style={{margin: 10}}>
        <input type="text" placeholder="now paste it in here"/>
      </div>
    </div>
  )
}

storiesOf('Side-effects|useCopyToClipboard', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCopyToClipboard.md')} />)
  .add('Demo', () => <Demo/>)
