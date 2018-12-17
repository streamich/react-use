import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useSpeech} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const state = useSpeech('Hello world!');

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>  
  );
};

storiesOf('UI/useSpeech', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useSpeech.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
