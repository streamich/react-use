import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useSpeech} from '..';

const Demo = () => {
  const state = useSpeech('Hello world!');

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>  
  );
};

storiesOf('useSpeech', module)
  .add('Example', () =>
    <Demo/>
  )
