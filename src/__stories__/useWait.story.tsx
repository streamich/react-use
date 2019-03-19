import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useWait} from '..';
import ShowDocs from '../util/ShowDocs';

const AnotherComponent = () => {
  const { isWaiting } = useWait();
  return <p>
    { isWaiting('creating user') ? "Now creating user..." : "" }
  </p>
}

const Demo = () => {
  const { Wait, isWaiting, startWaiting, endWaiting } = useWait();

  function createUser() {
    startWaiting('creating user');
    setTimeout(() => {
      endWaiting('creating user');
    }, 1000)
  }

  return (
    <div>
      <button disabled={isWaiting('creating user')} onClick={createUser}>
        <Wait on="creating user" fallback={<b>Creating User...</b>}>
          Create User
        </Wait>
      </button>
      <AnotherComponent />
    </div>
  );
};

storiesOf('UI|useWait', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useWait.md')} />)
  .add('Demo', () =>
    <useWait.Waiter><Demo/></useWait.Waiter>
  )
