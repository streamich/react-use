import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSlider } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const ref = React.useRef(null);
  const state = useSlider(ref);

  return (
    <div>
      <div ref={ref} style={{ position: 'relative', background: 'lightgray', padding: 4 }}>
        <p style={{ margin: 0, textAlign: 'center', color: state.isSliding ? 'red' : 'green' }}>
          {Math.round(state.value * 100)}%
        </p>
        <div style={{ position: 'absolute', top: 0, left: state.value * state.length - 10 }}>🎚</div>
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

storiesOf('UI|useSlider', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useSlider.md')} />)
  .add('Demo', () => <Demo />);
