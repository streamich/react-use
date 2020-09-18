import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRendersCount } from '../src/useRendersCount';
import useUpdate from '../src/useUpdate';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const update = useUpdate();
  const rendersCount = useRendersCount();

  return (
    <div>
      <span>Renders count: {rendersCount}</span>
      <br />
      <button onClick={update}>re-render</button>
    </div>
  );
};

storiesOf('State/useRendersCount', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useRendersCount.md')} />)
  .add('Demo', () => <Demo />);
