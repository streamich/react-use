import { storiesOf } from '@storybook/react';
import React, { FC } from 'react';
import { createSharedState } from '../src';
import ShowDocs from './util/ShowDocs';

const useCounter = createSharedState({ value1: 0, value2: 0 });

const CompA: FC = () => {
  const [value1, setValue] = useCounter((counter) => counter.value1);

  return (
    <> 
      <p>{value1}</p>
      <button onClick={() => setValue((prev) => ({
        value1: prev.value1 + 1,
        value2: prev.value2,
      }))}>+</button>
      <button onClick={() => setValue((prev) => ({
        value1: prev.value1 - 1,
        value2: prev.value2,
      }))}>-</button>
    </>
  );
};

const CompB: FC = () => {
  const [value2, setValue] = useCounter((counter) => counter.value2);

  return (
    <> 
      <p>{value2}</p>
      <button onClick={() => setValue((prev) => ({
        value1: prev.value1,
        value2: prev.value2 + 1,
      }))}>+</button>
      <button onClick={() => setValue((prev) => ({
        value1: prev.value1,
        value2: prev.value2 - 1,
      }))}>-</button>
    </>
  )
};

const Demo: FC = () => {
  return (
    <div>
      <CompA />
      <CompB />
    </div>
  );
};

storiesOf('State/createGlobalState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/createSharedState.md')} />)
  .add('Demo', () => <Demo />);
