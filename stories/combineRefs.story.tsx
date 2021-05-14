import { storiesOf } from '@storybook/react';
import React from 'react';
import { useMeasure, useScroll, combineRefs } from '../src';
import ShowDocs from './util/ShowDocs';

const style = {
  background: 'red',
  height: '400px',
  overflow: 'scroll',
}

const Demo = () => {
  const scrollRef = React.useRef(null);
  const { x, y } = useScroll(scrollRef);
  const [measureRef, state] = useMeasure();

  const ref = combineRefs(scrollRef, measureRef)

  return (
    <>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div>x: {x}</div>
      <div>y: {y}</div>
      <div ref={ref} style={style}>
        <div style={{ height: '2000px' }}>Scroll me & Resize me</div>
      </div>
    </>
  );
};

storiesOf('Miscellaneous|combineRefs', module)
  .add('Docs', () => <ShowDocs md={require('../docs/combineRefs.md')} />)
  .add('Demo', () => <Demo />);
