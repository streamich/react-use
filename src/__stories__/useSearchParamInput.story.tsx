import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSearchParamInput } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [value, setValue] = useSearchParamInput('input', 'default value');

  return <input value={value} onChange={e => setValue(e.target.value)} />;
};

storiesOf('UI|useSearchParamInput', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useSearchParamInput.md')} />)
  .add('Demo', () => <Demo />);
