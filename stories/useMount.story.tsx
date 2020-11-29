import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMount } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useMount(() => alert('MOUNTED'));

  return (
    <div>
      <code>useMount()</code> hook can be used to perform a side-effect when component is mounted.
    </div>
  );
};

storiesOf('Lifecycle/useMount', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMount.md')} />)
  .add('Demo', () => <Demo />);
