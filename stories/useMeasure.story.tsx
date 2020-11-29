import { storiesOf } from '@storybook/react';
import React from 'react';
import { useMeasure } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [ref, state] = useMeasure();

  return (
    <>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div ref={ref} style={{ background: 'red' }}>
        resize me
      </div>
    </>
  );
};

storiesOf('Sensors/useMeasure', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMeasure.md')} />)
  .add('Demo', () => <Demo />);
