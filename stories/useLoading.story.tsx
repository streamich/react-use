import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLoading } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [state, startLoading, stopLoading] = useLoading(["page", "submit"]);


  return (
    <div>
      <div>{JSON.stringify(state, null, 2)}</div>
      <button onClick={() => { startLoading('page')}}>Start <b>page</b> loading</button>
      <button onClick={() => { stopLoading('page')}}>Stop <b>page</b> loading</button>

      <button onClick={() => { startLoading('submit')}}>Start <b>submit</b> loading</button>
      <button onClick={() => { stopLoading('submit')}}>Stop <b>submit</b> loading</button>
    </div>
  );
};

storiesOf('State/useLoading', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLoading.md')} />)
  .add('Demo', () => <Demo />);
