import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useUniqueId } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [count, setCount] = React.useState(0);
  const id = useUniqueId('demo', [count]);

  return (
    <div style={{ width: 300, margin: '40px auto' }}>
      <label htmlFor={id}>Enter a value: </label>
      <input id={id} type="text" />
      <br />
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}>
        Click to update dependency array
      </button>
      <br />
      <p>
        ID is: <code>{id}</code>
      </p>
    </div>
  );
};

storiesOf('Miscellaneous/useUniqueId', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useUniqueId.md')} />)
  .add('Demo', () => <Demo />);
