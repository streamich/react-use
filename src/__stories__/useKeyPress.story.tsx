import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useKeyPress} from '..';
import ShowDocs from '../util/ShowDocs';
import {CenterStory} from './util/CenterStory';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const Demo = () => {
  const states = [];
  for (const key of keys) states.push(useKeyPress(key));

  return (
    <CenterStory>
      <div style={{textAlign: 'center'}}>
        Try pressing numbers
        <br />
        {states.reduce((s, pressed, index) => s + (pressed ? (s ? ' + ' : '') + keys[index] : ''), '')}
      </div>
    </CenterStory>
  );
};

storiesOf("Sensors|useKeyPress", module)
  .add("Docs", () => <ShowDocs md={require("../../docs/useKeyPress.md")} />)
  .add("Demo", () => <Demo />);
