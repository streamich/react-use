import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSize } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [sized, state] = useSize(({ width: currentWidth }) => (
    <div style={{ background: 'red' }}>Size me up! ({currentWidth}px)</div>
  ));

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      {sized}
    </div>
  );
};

storiesOf('Sensors/useSize', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSize.md')} />)
  .add('Demo', () => <Demo />);
