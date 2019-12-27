import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useNotification } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const notify = useNotification('Notification Title', { body: 'Hi!', requireInteraction: true });

  return <button onClick={notify}>Display Notification</button>;
};

storiesOf('UI/useNotification', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useNotification.md')} />)
  .add('Demo', () => <Demo />);
