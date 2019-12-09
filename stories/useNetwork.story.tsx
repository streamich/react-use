import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useNetwork } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const state = useNetwork();

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

storiesOf('Sensors|useNetwork', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useNetwork.md')} />)
  .add('Demo', () => <Demo />);
