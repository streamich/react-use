import {useCallbag} from '..';
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import ShowDocs from '../util/ShowDocs';
const interval = require('callbag-interval').default;

const Demo = () => {
  const count = useCallbag(() => (interval as any)(1000));
  return <span>{`Counter: ${count}`}</span>
};

storiesOf('State/useCallbag', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCallbag.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
