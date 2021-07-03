import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useBodyScrollSize } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { width, height } = useBodyScrollSize();

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};

storiesOf('Sensors/useBodyScrollSize', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useBodyScrollSize.md')} />)
  .add('Demo', () => <Demo />);
