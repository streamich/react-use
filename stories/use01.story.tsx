import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { use01 } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [num, toggle, setNum] = use01();

  return (
    <div>
      <div>{num ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setNum(1)}>set ON</button>
      <button onClick={() => setNum(0)}>set OFF</button>
    </div>
  );
};

storiesOf('State/useToggle', module)
  .add('Docs', () => <ShowDocs md={require('../docs/use01.md')} />)
  .add('Demo', () => <Demo />);
