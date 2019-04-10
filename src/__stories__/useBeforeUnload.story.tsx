import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useBeforeUnload} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
    useBeforeUnload('Are you sure?');

  return (
    <div>
      Try to reload or close tab
    </div>
  );
};

storiesOf('Side effects|useBeforeUnload', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useBeforeUnload.md')} />)
  .add('Demo', () => <Demo/>)
