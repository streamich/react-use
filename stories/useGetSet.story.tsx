import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';
import { useGetSet } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [get, set] = useGetSet(0);
  const onClick = () => {
    setTimeout(() => {
      set(get() + 1);
    }, 1_000);
  };

  return <button onClick={onClick}>Clicked: {get()}</button>;
};

const DemoWrong = () => {
  const [cnt, set] = useState(0);
  const onClick = () => {
    setTimeout(() => {
      set(cnt + 1);
    }, 1_000);
  };

  return <button onClick={onClick}>Clicked: {cnt}</button>;
};

storiesOf('State/useGetSet', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useGetSet.md')} />)
  .add('Demo, 1s delay', () => <Demo />)
  .add('DemoWrong, 1s delay', () => <DemoWrong />);
