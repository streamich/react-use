import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useGeolocation } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const state = useGeolocation();

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

storiesOf('Sensors/useGeolocation', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useGeolocation.md')} />)
  .add('Demo', () => <Demo />);
