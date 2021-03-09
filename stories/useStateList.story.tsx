import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRef } from 'react';
import { useStateList } from '../src';
import ShowDocs from './util/ShowDocs';

const stateSet = ['first', 'second', 'third', 'fourth', 'fifth'];

const Demo = () => {
  const { state, prev, next, setStateAt, setState, currentIndex } = useStateList(stateSet);
  const indexInput = useRef<HTMLInputElement>(null);
  const stateInput = useRef<HTMLInputElement>(null);

  return (
    <div>
      <pre>
        {state} [index: {currentIndex}]
      </pre>
      <button onClick={() => prev()}>prev</button>
      <br />
      <button onClick={() => next()}>next</button>
      <br />
      <input type="text" ref={indexInput} style={{ width: 120 }} />
      <button onClick={() => setStateAt((indexInput.current!.value as unknown) as number)}>
        set state by index
      </button>
      <br />
      <input type="text" ref={stateInput} style={{ width: 120 }} />
      <button onClick={() => setState(stateInput.current!.value)}> set state by value</button>
    </div>
  );
};

storiesOf('State/useStateList', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useStateList.md')} />)
  .add('Demo', () => <Demo />);
