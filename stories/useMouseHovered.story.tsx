import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMouseHovered } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo: React.FC<any> = ({ whenHovered, bound }) => {
  const ref = React.useRef(null);
  const state = useMouseHovered(ref, { whenHovered, bound });

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

storiesOf('Sensors/useMouseHovered', module)
  .addDecorator(withKnobs)
  .add('Docs', () => <ShowDocs md={require('../docs/useMouse.md')} />)
  .add('Demo', () => {
    const bound = boolean('bound', false);
    const whenHovered = boolean('whenHovered', false);
    return <Demo whenHovered={whenHovered} bound={bound} />;
  });
