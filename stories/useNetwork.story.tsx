import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useEffect } from 'react';
import { useNetworkState } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const state = useNetworkState();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <div>Since JSON do not output `undefined` fields look the console to see whole the state</div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

storiesOf('Sensors/useNetworkState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useNetworkState.md')} />)
  .add('Demo', () => <Demo />);
