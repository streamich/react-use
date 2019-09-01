import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSearchParam } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const foo = useSearchParam('foo');

  return (
    <div>
      <div>foo: {foo || '🤷‍♂️'}</div>
      <div>
        <button onClick={() => history.pushState({}, '', location.pathname + '?foo=bar')}>foo: bar</button>
      </div>
      <div>
        <button onClick={() => history.pushState({}, '', location.pathname + '?foo=baz')}>foo: baz</button>
      </div>
      <div>
        <button onClick={() => history.pushState({}, '', location.pathname)}>delete</button>
      </div>
    </div>
  );
};

storiesOf('Sensors|useSearchParam', module)
  // .add('Docs', () => <ShowDocs md={require('../../docs/useQueryParam.md')} />)
  .add('Demo', () => <Demo />);
