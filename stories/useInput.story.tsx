import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useInput } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [email, onEmailChange] = useInput('')
  const [count, onCountChange, setCount] = useInput(0, (event) => {
    const v = +event.currentTarget.value
    if (!isNaN(v)) {
      setCount(v)
    }
  })

  const handleClickAdd = () => {
    setCount(+count + 10)
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="please input email"
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="please input number"
          value={count}
          onChange={onCountChange}
        />
        <button onClick={handleClickAdd}>add 10</button>
      </div>
    </div>
  );
};

storiesOf('UI|useInput', module)
.add('Docs', () => <ShowDocs md={require('../docs/useInput.md')} />)
.add('Demo', () => <Demo />);
