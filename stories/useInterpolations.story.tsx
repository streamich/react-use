import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useInterpolations } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const values = useInterpolations(
    {
      left: [0, 300],
      top: [0, 200],
      opacity: [0, 1],
    },
    'inOutCirc',
    2000
  );

  return (
    <div>
      <div
        style={{
          position: 'relative',
          left: values.left,
          top: values.top,
          opacity: values.opacity,
          width: 100,
          height: 100,
          background: 'tomato',
        }}
      />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

storiesOf('Animation/useInterpolations', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useInterpolations.md')} />)
  .add('Demo', () => <Demo />);
