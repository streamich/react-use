import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLifecycles } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useLifecycles(
    () => console.log('MOUNTED'),
    () => console.log('UNMOUNTED')
  );
  return null;
};

storiesOf('Lifecycle/useLifecycles', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLifecycles.md')} />)
  .add('Demo', () => <Demo />);
