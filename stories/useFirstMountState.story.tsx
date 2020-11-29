import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useFirstMountState } from '../src/useFirstMountState';
import useUpdate from '../src/useUpdate';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const isFirstMount = useFirstMountState();
  const update = useUpdate();

  return (
    <div>
      <span>This component is just mounted: {isFirstMount ? 'YES' : 'NO'}</span>
      <br />
      <button onClick={update}>re-render</button>
    </div>
  );
};

storiesOf('State/useFirstMountState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useFirstMountState.md')} />)
  .add('Demo', () => <Demo />);
