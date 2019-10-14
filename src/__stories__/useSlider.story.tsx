import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSlider } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const ref = React.useRef(null);
  const state = useSlider(ref);

  return (
    <div>
      <div ref={ref} style={{ position: 'relative', width: '100%', height: 25, background: 'lightgray' }}>
        <div style={{ position: 'absolute', left: state.value * state.length - 10 }}>🎚</div>
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

storiesOf('UI|useSlider', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useSlider.md')} />)
  .add('Demo', () => <Demo />);
