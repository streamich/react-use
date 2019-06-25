import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { usePermission } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const state = usePermission({ name: 'microphone' });

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

storiesOf('UI|usePermission', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/usePermission.md')} />)
  .add('Demo', () => <Demo />);
