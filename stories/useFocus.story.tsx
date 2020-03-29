import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useFocus } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const element = (focused: boolean) => (
    <div>
      <label htmlFor="useFocus" style={{fontWeight: focused ? 'bold' : 'normal'}}>Click here</label>
      <input type="text" id="useFocus" value="Focus here" />
    </div>
  );

  const [input, focused] = useFocus(element);

  return (
    <div>
      {input}
      <div>{focused ? 'Input is on focus!' : ''}</div>
    </div>
  );
};

storiesOf('Sensors|useFocus', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useFocus.md')} />)
  .add('Demo', () => <Demo />)