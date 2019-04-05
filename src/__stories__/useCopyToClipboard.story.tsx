import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ShowDocs from './util/ShowDocs';
import {useCopyToClipboard} from '..';

const Demo = () => {
  const [success, copyToClipboard] = useCopyToClipboard(2000);
  const textToCopy = "text to be copied"
  return (
    <div>
      <span style={{margin: 10}}>{textToCopy}</span>
      <button type="button" onClick={ () => copyToClipboard(textToCopy)}>copy text</button>
      { success && <span> text copied!</span>}
      <div style={{margin: 10}}>
        <input type="text" placeholder="now paste it in here"/>
      </div>
    </div>
  )
}

storiesOf('UI|useCopyToClipboard', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCopyToClipboard.md')} />)
  .add('Demo', () => <Demo/>)
