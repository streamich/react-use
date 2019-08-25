import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useStateList } from '..';
import ShowDocs from './util/ShowDocs';

const stateSet = ['first', 'second', 'third', 'fourth', 'fifth'];

const Demo = () => {
  const { state, prev, next } = useStateList(stateSet);

  return (
    <div>
      <pre>{state}</pre>
      <button onClick={() => prev()}>prev</button>
      <button onClick={() => next()}>next</button>
    </div>
  );
};

storiesOf('State|useStateList', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useStateList.md')} />)
  .add('Demo', () => <Demo />);
