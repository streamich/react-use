import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRef } from 'react';
import { useCounter, useStateHistory } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, setState, history] = useStateHistory('');
  const input = useRef<HTMLInputElement | null>(null);

  const [stepSize, { set: setStepSize }] = useCounter(1, 3, 1);

  console.log(history);

  return (
    <div>
      <div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            state !== input.current!.value && setState(input.current!.value);
          }}
          style={{ display: 'inline-block' }}
        >
          <input type="text" ref={input} />
          <button>Submit new state</button>
        </form>
      </div>

      <div style={{ marginTop: 8 }}>
        Current state: <span>{state}</span>
      </div>
      <div style={{ marginTop: 8 }}>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (e.currentTarget.disabled) {
              return;
            }

            history.back(stepSize);
          }}
          disabled={!history.position}
        >
          &lt; Back
        </button>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (e.currentTarget.disabled) {
              return;
            }

            history.forward(stepSize);
          }}
          disabled={history.position >= history.history.length - 1}
        >
          Forward &gt;
        </button>
        &nbsp; Step size:&nbsp;
        <input
          type="number"
          value={stepSize}
          min={1}
          max={3}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setStepSize((e.currentTarget.value as any) * 1);
          }}
        />
      </div>
    </div>
  );
};

storiesOf('State|useStateHistory', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMultiStateValidator.md')} />)
  .add('Demo', () => <Demo />);
