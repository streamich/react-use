import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLocation } from '../src';
import ShowDocs from './util/ShowDocs';

const go = (page) => window.history.pushState({}, '', page);

const Demo = () => {
  const state = useLocation();

  return (
    <div>
      <button onClick={() => go('page-1')}>Page 1</button>
      <button onClick={() => go('page-2')}>Page 2</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

storiesOf('Sensors/useLocation', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLocation.md')} />)
  .add('Demo', () => <Demo />);
