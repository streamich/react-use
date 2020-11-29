import { storiesOf } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { useCookie } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [value, updateCookie, deleteCookie] = useCookie('my-cookie');
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    deleteCookie();
  }, []);

  const updateCookieHandler = () => {
    updateCookie(`my-awesome-cookie-${counter}`);
    setCounter((c) => c + 1);
  };

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={updateCookieHandler}>Update Cookie</button>
      <br />
      <button onClick={deleteCookie}>Delete Cookie</button>
    </div>
  );
};

storiesOf('Side effects/useCookie', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCookie.md')} />)
  .add('Demo', () => <Demo />);
