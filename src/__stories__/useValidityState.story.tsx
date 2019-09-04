import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCallback } from 'react';
import { useValidatableState } from '../index';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const validator = useCallback(s => [s === '' ? null : (s * 1) % 2 === 0], []);
  const [state, setState, [isValid]] = useValidatableState<string>(validator, '');

  return (
    <div>
      <div>Below field is valid only if number is even</div>
      <input
        type="number"
        min="0"
        max="10"
        value={state}
        onChange={ev => {
          setState(ev.target.value);
        }}
      />
      {isValid !== null && <span>{isValid ? 'Valid!' : 'Invalid'}</span>}
    </div>
  );
};

storiesOf('State|useValidatableState', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useValidatableState.md')} />)
  .add('Demo', () => <Demo />);
