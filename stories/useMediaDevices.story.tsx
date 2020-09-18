import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMediaDevices } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const state = useMediaDevices();

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

storiesOf('Sensors/useMediaDevices', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMediaDevices.md')} />)
  .add('Demo', () => <Demo />);
