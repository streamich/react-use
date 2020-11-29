import { storiesOf } from '@storybook/react';
import React, { FC } from 'react';
import { createGlobalState } from '../src';
import ShowDocs from './util/ShowDocs';

const useGlobalValue = createGlobalState<number>(0);

const CompA: FC = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value + 1)}>+</button>;
};

const CompB: FC = () => {
  const [value, setValue] = useGlobalValue();

  return <button onClick={() => setValue(value - 1)}>-</button>;
};

const Demo: FC = () => {
  const [value] = useGlobalValue();
  return (
    <div>
      <p>{value}</p>
      <CompA />
      <CompB />
    </div>
  );
};

storiesOf('State/createGlobalState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/createGlobalState.md')} />)
  .add('Demo', () => <Demo />);
