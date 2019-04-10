import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useBeforeUnload} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useBeforeUnload();

  return (
    <div>
      Try to reload or close tab
    </div>
  );
};

storiesOf('Side effects|useBeforeUnload', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useBeforeUnload.md')} />)
  .add('Demo', () => <Demo/>)
