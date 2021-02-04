import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useWindowScroll } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { x, y } = useWindowScroll();

  return (
    <div
      style={{
        width: '200vw',
        height: '200vh',
      }}>
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
        }}>
        <div>x: {x}</div>
        <div>y: {y}</div>
      </div>
    </div>
  );
};

storiesOf('Sensors/useWindowScroll', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useWindowScroll.md')} />)
  .add('Demo', () => <Demo />);
