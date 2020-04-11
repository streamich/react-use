import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ShowDocs from './util/ShowDocs';
import { useFunction } from '../src';

const Demo = () => {
  const [value, setValue] = React.useState(0);
  const increment = useFunction(() => setValue(value + 1));

  return (
    <div>
      <div>
        current: {value}
      </div>
      <br />
      Current value: <button onClick={increment}>Increment</button>
    </div>
  );
};

storiesOf('Miscellaneous|useFunction', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useFunction.md')} />)
  .add('Demo', () => <Demo />);
