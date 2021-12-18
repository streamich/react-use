import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMouseWheel } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo: React.FC<any> = () => {
  const mouseWheel = useMouseWheel();
  return (
    <>
      <h3>delta Y Scrolled: {mouseWheel}</h3>
    </>
  );
};

storiesOf('Sensors/useMouseWheel', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMouseWheel.md')} />)
  .add('Demo', () => <Demo />);
