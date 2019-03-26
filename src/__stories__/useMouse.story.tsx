import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useMouse, useToggle} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const [whenHovered, toggleWhenHovered] = useToggle(false);
  const ref = React.useRef(null);
  const state = useMouse(ref, whenHovered)

  return (
    <>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
      <label>
        <input type="checkbox" checked={whenHovered} onChange={() => toggleWhenHovered()} />
        When hovered
      </label>
      <div
        ref={ref}
        style={{
          position: 'relative',
          width: '400px',
          height: '400px',
          backgroundColor: 'whitesmoke',
        }}>
        <span style={{
          position: 'absolute',
          left: `${state.elX}px`,
          top: `${state.elY}px`,
          pointerEvents: 'none',
          transform: 'scale(4)'}}>
          🐭
        </span>
      </div>
    </>
  );
};

storiesOf('Sensors|useMouse', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMouse.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
