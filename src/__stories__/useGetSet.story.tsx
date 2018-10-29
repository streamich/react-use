import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useGetSet} from '..';
import {useState} from '../react';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const [get, set] = useGetSet(0);
  const onClick = () => {
    setTimeout(() => {
      set(get() + 1)
    }, 1_000);
  };

  return (
    <button onClick={onClick}>Clicked: {get()}</button>
  );
};

const DemoWrong = () => {
  const [cnt, set] = useState(0);
  const onClick = () => {
    setTimeout(() => {
      set(cnt + 1)
    }, 1_000);
  };

  return (
    <button onClick={onClick}>Clicked: {cnt}</button>
  );
};

storiesOf('useGetSet', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useGetSet.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
  .add('DemoWrong', () =>
    <DemoWrong/>
  )
