import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useKeyboardJs from '../useKeyboardJs';
import { CenterStory } from './util/CenterStory';
import ShowDocs from './util/ShowDocs';
import { useMemo } from 'react';

const Demo = ({ combo }) => {
  const [pressed] = useKeyboardJs(combo);

  return (
    <CenterStory>
      <div style={{ textAlign: 'center' }}>
        Press{' '}
        <code style={{ color: 'red', background: '#f6f6f6', padding: '3px 6px', borderRadius: '3px' }}>{combo}</code>{' '}
        combo
        <br />
        <br />
        <div style={{ fontSize: '4em' }}>{pressed ? '💋' : ''}</div>
      </div>
    </CenterStory>
  );
};

// for synchronous update
let q = 0;
let w = 0;

const Demo2 = () => {
  const qOption = useMemo(
    () => ({
      pressedFn(): void {
        ++q;
      },
      preventRepeatByDefault: true,
    }),
    []
  );
  const wOption = useMemo(
    () => ({
      pressedFn(): void {
        ++w;
      },
      preventRepeatByDefault: false,
    }),
    []
  );
  const [isQPressed] = useKeyboardJs('q', qOption);
  const [isWPressed] = useKeyboardJs('w', wOption);

  return (
    <CenterStory>
      <h4>Holding Q trigger event once while W is not.</h4>
      <div>
        Event for pressing Q fired <strong>{q}</strong> times
      </div>
      <div>
        Event for pressing W fired <strong>{w}</strong> times
      </div>
      <div>Is Q pressed? {String(isQPressed)}</div>
      <div>Is W pressed? {String(isWPressed)}</div>
    </CenterStory>
  );
};

storiesOf('Sensors|useKeyboardJs', module)
  .addDecorator(withKnobs)
  .add('Docs', () => <ShowDocs md={require('../../docs/useKeyboardJs.md')} />)
  .add('Demo', () => {
    const combo = text('Combo', 'i + l + u');
    return <Demo combo={combo} />;
  })
  .add('Demo2', () => <Demo2 />);
