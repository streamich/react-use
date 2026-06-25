import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useScrollableDirection } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const scrollRef = React.useRef(null);
  const [[left, right], [top, bottom]] = useScrollableDirection(scrollRef);

  return (
    <>
      <div>
        Scrollable:
        <br />
        <br />
        Left - {left.toString()}
        <br />
        Right - {right.toString()}
        <br />
        Top - {top.toString()}
        <br />
        Bottom - {bottom.toString()}
      </div>
      <br />
      <div
        ref={scrollRef}
        style={{
          width: '400px',
          height: '200px',
          backgroundColor: 'whitesmoke',
          overflow: 'scroll',
          border: '2px solid green',
          padding: 10,
        }}
      >
        <div
          style={{ width: '1000px', height: '1000px', border: '1px solid gray', backgroundColor: 'white', padding: 10 }}
        >
          Scroll me
        </div>
      </div>
    </>
  );
};

storiesOf('Sensors/useScrollableDirection', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useScrollableDirection.md')} />)
  .add('Demo', () => <Demo />);
