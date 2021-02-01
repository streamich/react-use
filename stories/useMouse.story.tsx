import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMouse } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo: React.FC<any> = () => {
  const ref = React.useRef(null);
  const state = useMouse(ref);

  return (
    <>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <br />
      <br />
      <div
        ref={ref}
        style={{
          position: 'relative',
          width: '400px',
          height: '400px',
          backgroundColor: 'whitesmoke',
        }}>
        <span
          style={{
            position: 'absolute',
            left: `${state.elX}px`,
            top: `${state.elY}px`,
            pointerEvents: 'none',
            transform: 'scale(4)',
          }}>
          🐭
        </span>
      </div>
    </>
  );
};

storiesOf('Sensors/useMouse', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMouse.md')} />)
  .add('Demo', () => <Demo />);
