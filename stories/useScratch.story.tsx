import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useScratch } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [ref, state] = useScratch();

  const blockStyle: React.CSSProperties = {
    position: 'relative',
    width: 400,
    height: 400,
    border: '1px solid tomato',
  };

  const preStyle: React.CSSProperties = {
    pointerEvents: 'none',
    userSelect: 'none',
  };

  let { x = 0, y = 0, dx = 0, dy = 0 } = state;
  if (dx < 0) [x, dx] = [x + dx, -dx];
  if (dy < 0) [y, dy] = [y + dy, -dy];

  const rectangleStyle: React.CSSProperties = {
    position: 'absolute',
    left: x,
    top: y,
    width: dx,
    height: dy,
    border: '1px solid tomato',
    pointerEvents: 'none',
    userSelect: 'none',
  };

  return (
    <div ref={ref} style={blockStyle}>
      <pre style={preStyle}>{JSON.stringify(state, null, 4)}</pre>
      {state.isScratching && <div style={rectangleStyle} />}
    </div>
  );
};

storiesOf('Sensors/useScratch', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useScratch.md')} />)
  .add('Demo', () => <Demo />);
