import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useGetSetState } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [get, setState] = useGetSetState<{ cnt: number }>({ cnt: 0 });
  const onClick = () => {
    setTimeout(() => {
      setState({ cnt: get().cnt + 1 });
    }, 1_000);
  };

  return <button onClick={onClick}>Clicked: {get().cnt}</button>;
};

storiesOf('State/useGetSetState', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useGetSetState.md')} />)
  .add('Demo', () => <Demo />);
