import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useRefMounted, useRaf} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const refMounted = useRefMounted();
  useRaf();
  return (
    <div>
      is mounted: {refMounted.current ? '👍' : '👎'}
    </div>
  );
};

storiesOf('Lifecycle|useRefMounted', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useRefMounted.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
