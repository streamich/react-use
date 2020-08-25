import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCallbackState } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = useCallbackState(0);

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

storiesOf('State|useCallbackState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCallbackState.md')} />)
  .add('Demo', () => <Demo />);