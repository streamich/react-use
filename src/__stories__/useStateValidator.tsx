import { storiesOf } from '@storybook/react';
import * as React from 'react';
import useStateValidator from '../useStateValidator';
import ShowDocs from './util/ShowDocs';

const DemoStateValidator = s => [s === '' ? null : (s * 1) % 2 === 0];
const Demo = () => {
  const [state, setState] = React.useState<string | number>(0);
  const [[isValid]] = useStateValidator(state, DemoStateValidator);

  return (
    <div>
      <div>Below field is valid only if number is even</div>
      <input
        type="number"
        min="0"
        max="10"
        value={state}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          setState(ev.target.value);
        }}
      />
      {isValid !== null && <span>{isValid ? 'Valid!' : 'Invalid'}</span>}
    </div>
  );
};

storiesOf('State|useStateValidator', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useStateValidator.md')} />)
  .add('Demo', () => <Demo />);
