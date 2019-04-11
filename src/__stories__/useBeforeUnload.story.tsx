import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useToggle, useBeforeUnload} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [dirty, toggleDirty] = useToggle(false);
  useBeforeUnload(dirty, 'You have unsaved changes, are you sure?');

  return (
    <div>
      {dirty && 'Try to reload or close tab'}
      <button onClick={() => toggleDirty()}>{dirty ? 'Disable' : 'Enable'}</button>
    </div>
  );
};

storiesOf('Side effects|useBeforeUnload', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useBeforeUnload.md')} />)
  .add('Demo', () => <Demo/>)
