import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMountedState } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const isMounted = useMountedState();
  const [, updateState] = React.useState();

  requestAnimationFrame(updateState);

  return <div>This component is {isMounted() ? 'MOUNTED' : 'NOT MOUNTED'}</div>;
};

storiesOf('Lifecycle/useMountedState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMountedState.md')} />)
  .add('Demo', () => <Demo />);
