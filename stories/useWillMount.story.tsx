import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useWillMount } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useWillMount(() => alert('WILL MOUNT'));

  return (
    <div>
      <code>useWillMount()</code> hook can be used to perform a side-effect when component will
      mount.
    </div>
  );
};

storiesOf('Lifecycle/useWillMount', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useWillMount.md')} />)
  .add('Demo', () => <Demo />);
