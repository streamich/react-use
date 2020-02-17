import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useWindowSize } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const callback = state => console.log('Callback fired with: ', state);
  const { width, height } = useWindowSize(null, null, callback);

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};

storiesOf('Sensors|useWindowSize', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useWindowSize.md')} />)
  .add('Demo', () => <Demo />);
