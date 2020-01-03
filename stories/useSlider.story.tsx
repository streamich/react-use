import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSlider } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const ref = React.useRef(null);
  const state = useSlider(ref);

  return (
    <div>
      <div ref={ref} style={{ position: 'relative', background: 'yellow', padding: 4 }}>
        <p style={{ margin: 0, textAlign: 'center' }}>Slide me</p>
        <div style={{ position: 'absolute', top: 0, left: state.pos, transform: 'scale(2)' }}>
          {state.isSliding ? '🏂' : '🎿'}
        </div>
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

storiesOf('UI|useSlider', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSlider.md')} />)
  .add('Demo', () => <Demo />);
