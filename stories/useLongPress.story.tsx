import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLongPress } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const onLongPress = () => {
    console.log('calls callback after long pressing 300ms');
  };

  const defaultDelay = 300;
  const longPressEvent = useLongPress(onLongPress, defaultDelay);

  return <button {...longPressEvent}>useLongPress</button>;
};

storiesOf('Sensors|useLongPress', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLongPress.md')} />)
  .add('Demo', () => <Demo />);
