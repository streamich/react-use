import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCallback, useRef } from 'react';
import { useCounter, useStateWithHistory } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, setState, history] = useStateWithHistory('', 10, ['hello', 'world']);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [stepSize, { set: setStepSize }] = useCounter(1, 3, 1);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      state !== inputRef.current!.value && setState(inputRef.current!.value);
    },
    [state]
  );

  const handleBackClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.disabled) {
        return;
      }

      window.history.back(stepSize);
    },
    [history, stepSize]
  );

  const handleForwardClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.disabled) {
        return;
      }

      window.history.forward(stepSize);
    },
    [history, stepSize]
  );

  const handleStepSizeChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setStepSize((e.currentTarget.value as any) * 1);
    },
    [stepSize]
  );

  return (
    <div>
      <div>
        <form onSubmit={handleFormSubmit} style={{ display: 'inline-block' }}>
          <input type="text" ref={inputRef} />
          <button>Submit new state</button>
        </form>
      </div>

      <div style={{ marginTop: 8 }}>
        Current state: <span>{state}</span>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={handleBackClick} disabled={!window.history.position}>
          &lt; Back
        </button>
        <button
          onClick={handleForwardClick}
          disabled={window.history.position >= window.history.window.history.length - 1}>
          Forward &gt;
        </button>
        &nbsp; Step size:&nbsp;
        <input type="number" value={stepSize} min={1} max={3} onChange={handleStepSizeChange} />
      </div>

      <div style={{ marginTop: 8 }}>
        <div>Current history</div>
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(window.history.history, null, 2)
              .replace(/\n/g, '<br/>')
              .replace(/ /g, '&nbsp;'),
          }}
        />
      </div>
    </div>
  );
};

storiesOf('State/useStateWithHistory', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useStateWithHistory.md')} />)
  .add('Demo', () => <Demo />);
