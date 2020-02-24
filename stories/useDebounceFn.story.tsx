import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCallback } from 'react';
import { useDebounceFn } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, setState] = React.useState('Not called yet');

  function fn() {
    setState(`called at ${Date.now()}`);
  }

  const [isReady, cancel, reset] = useDebounceFn(fn, 5000);
  const cancelButtonClick = useCallback(() => {
    if (isReady() === false) {
      cancel();
      setState(`cancelled`);
    } else {
      reset();
      setState('Not called yet');
    }
  }, []);

  const readyState = isReady();

  return (
    <div>
      <div>{readyState !== null ? 'Function will be called in 5 seconds' : 'Timer cancelled'}</div>
      <button onClick={cancelButtonClick}> {readyState === false ? 'cancel' : 'restart'} timeout</button>
      <br />
      <div>Function state: {readyState === false ? 'Pending' : readyState ? 'Called' : 'Cancelled'}</div>
      <div>{state}</div>
    </div>
  );
};

storiesOf('Side-effects|useDebounceFn', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useTimeoutFn.md')} />)
  .add('Demo', () => <Demo />);
