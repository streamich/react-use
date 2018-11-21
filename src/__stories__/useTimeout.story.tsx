import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useTimeout} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const ready = useTimeout(2e3);

  return (
    <div>
      Ready: {ready ? 'Yes' : 'No'}
    </div>
  );
};

storiesOf('Animations/useTimeout', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useTimeout.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
