import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ShowDocs from './util/ShowDocs';
import { useCallback } from 'react';
import { useValue } from '../src';

const Demo = () => {
  const [value, setValue] = React.useState(0);
  const valueRef = useValue(value);
  const increment = useCallback(() => setValue(valueRef.current + 1), []);

  return (
    <div>
      <div>
        current: {valueRef.current}
      </div>
      <br />
      Current value: <button onClick={increment}>Increment</button>
    </div>
  );
};

storiesOf('Miscellaneous|useValue', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useValue.md')} />)
  .add('Demo', () => <Demo />);
