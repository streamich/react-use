import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSearchParam } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const edit = useSearchParam('edit');

  return (
    <div>
      <div>edit: {edit || '🤷‍♂️'}</div>
      <div>
        <button
          onClick={() => window.history.pushState({}, '', window.location.pathname + '?edit=123')}>
          Edit post 123 (?edit=123)
        </button>
      </div>
      <div>
        <button
          onClick={() => window.history.pushState({}, '', window.location.pathname + '?edit=999')}>
          Edit post 999 (?edit=999)
        </button>
      </div>
      <div>
        <button onClick={() => window.history.pushState({}, '', window.location.pathname)}>
          Close modal
        </button>
      </div>
    </div>
  );
};

storiesOf('Sensors/useSearchParam', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSearchParam.md')} />)
  .add('Demo', () => <Demo />);
