import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useUnmount } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useUnmount(() => alert('UNMOUNTED'));

  return (
    <div>
      <code>useUnmount()</code> hook can be used to perform side-effects when component unmounts.
      This component will alert you when it is un-mounted.
    </div>
  );
};

storiesOf('Lifecycle/useUnmount', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useUnmount.md')} />)
  .add('Demo', () => <Demo />);
