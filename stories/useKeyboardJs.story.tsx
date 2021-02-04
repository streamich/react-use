import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useKeyboardJs from '../src/useKeyboardJs';
import { CenterStory } from './util/CenterStory';
import ShowDocs from './util/ShowDocs';

const Demo = ({ combo }) => {
  const [pressed] = useKeyboardJs(combo);

  return (
    <CenterStory>
      <div style={{ textAlign: 'center' }}>
        Press{' '}
        <code
          style={{ color: 'red', background: '#f6f6f6', padding: '3px 6px', borderRadius: '3px' }}>
          {combo}
        </code>{' '}
        combo
        <br />
        <br />
        <div style={{ fontSize: '4em' }}>{pressed ? '💋' : ''}</div>
      </div>
    </CenterStory>
  );
};

storiesOf('Sensors/useKeyboardJs', module)
  .addDecorator(withKnobs)
  .add('Docs', () => <ShowDocs md={require('../docs/useKeyboardJs.md')} />)
  .add('Demo', () => {
    const combo = text('Combo', 'i + l + u');
    return <Demo combo={combo} />;
  });
