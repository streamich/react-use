import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useScroll } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const scrollRef = React.useRef(null);
  const { x, y } = useScroll(scrollRef);

  return (
    <>
      <div>x: {x}</div>
      <div>y: {y}</div>
      <div
        ref={scrollRef}
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'whitesmoke',
          overflow: 'scroll',
        }}>
        <div style={{ width: '2000px', height: '2000px' }}>Scroll me</div>
      </div>
    </>
  );
};

storiesOf('Sensors/useScroll', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useScroll.md')} />)
  .add('Demo', () => <Demo />);
