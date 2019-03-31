import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useIdle} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const isIdle = useIdle(3e3);

  return (
    <div>
      <div>User is idle: {isIdle ? 'Yes' : 'No'}</div>
    </div>
  );
};

storiesOf('Sensors|useIdle', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useIdle.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
