import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useScrolling } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const scrollRef = React.useRef(null);
  const scrolling = useScrolling(scrollRef);

  return (
    <>
      {<div>{scrolling ? 'Scrolling' : 'Not scrolling'}</div>}
      <br />
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

storiesOf('Sensors/useScrolling', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useScrolling.md')} />)
  .add('Demo', () => <Demo />);
