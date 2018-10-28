import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useSetState} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const [state, setState] = useSetState({});

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({hello: 'world'})}>hello</button>
      <button onClick={() => setState({foo: 'bar'})}>foo</button>
    </div>
  );
};

storiesOf('useSetState', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useSetState.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
