import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useStateWithCallback } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = useStateWithCallback(0);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => {
        setCount(count + 1, (count) => {
          console.log(count);
        })
      }}>+</button>
      <button onClick={() => {
        setCount(count - 1, (count) => {
          console.log(count);
        })
      }}>-</button>
      <button
        onClick={() => {
          setCount(prevCount => {
            return prevCount + 1;
          }, (count) => {
            console.log(count);
          })
        }}
      >
        +10 (Another Format)
      </button>
    </div>
  );
};

storiesOf('State|useStateWithCallback', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useStateWithCallback.md')} />)
  .add('Demo', () => <Demo />);
  