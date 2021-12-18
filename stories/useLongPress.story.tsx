import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLongPress } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const onLongPress = () => {
    console.log('calls callback after long pressing 300ms');
  };

  const defaultOptions = {
    isPreventDefault: true,
    delay: 300,
  };
  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  return <button {...longPressEvent}>useLongPress</button>;
};

storiesOf('Sensors/useLongPress', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLongPress.md')} />)
  .add('Demo', () => <Demo />);
