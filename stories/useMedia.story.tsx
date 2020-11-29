import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMedia } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const isWide = useMedia('(min-width: 480px)');

  return <div>Screen is wide: {isWide ? 'Yes' : 'No'}</div>;
};

storiesOf('Sensors/useMedia', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMedia.md')} />)
  .add('Demo', () => <Demo />);
