import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useRaf} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const frames = useRaf(5000, 1000);

  return (
    <div>
      Elapsed: {frames}
    </div>
  );
};

storiesOf('Animations/useRaf', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useRaf.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
