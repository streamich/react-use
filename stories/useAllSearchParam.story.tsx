import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useAllSearchParam } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const params = useAllSearchParam();

  return (
    <div>
      <div>params: {JSON.stringify(params)}</div>
      <div>
        <button
          onClick={() =>
            window.history.pushState({}, '', window.location.pathname + '?edit=123&foo=bar')
          }>
          Edit post 123 (?edit=123&foo=bar)
        </button>
      </div>
      <div>
        <button onClick={() => window.history.pushState({}, '', window.location.pathname)}>
          Clear params
        </button>
      </div>
    </div>
  );
};

storiesOf('Sensors/useAllSearchParam', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useAllSearchParam.md')} />)
  .add('Demo', () => <Demo />);
