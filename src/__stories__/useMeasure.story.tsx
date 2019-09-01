import { storiesOf } from '@storybook/react';
import React from 'react';
import { useMeasure } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [ref, { width, height }] = useMeasure();

  return (
    <>
      <div>width: {width}</div>
      <div>height: {height}</div>
      <div
        style={{
          background: 'red',
        }}
        ref={ref}
      >
        resize me
      </div>
    </>
  );
};

storiesOf('Sensors|useMeasure', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMeasure.md')} />)
  .add('Demo', () => <Demo />);
