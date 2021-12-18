import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useOrientation } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const state = useOrientation();

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

storiesOf('Sensors/useOrientation', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useOrientation.md')} />)
  .add('Demo', () => <Demo />);
