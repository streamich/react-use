import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useDefault } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const initialUser = { name: 'Marshall' };
  const defaultUser = { name: 'Mathers' };
  const [user, setUser] = useDefault(defaultUser, initialUser);

  return (
    <div>
      <div>User: {user.name}</div>
      <input onChange={(e) => setUser({ name: e.target.value })} />
      <button onClick={() => setUser(null)}>set to null</button>
    </div>
  );
};

storiesOf('State/useDefault', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useDefault.md')} />)
  .add('Demo', () => <Demo />);
