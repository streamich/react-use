import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCounter, useDeepCompareMemo } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [options, setOptions] = React.useState({ max: 500 });
  const countNormalRef = React.useRef(0);
  const countDeepRef = React.useRef(0);

  const countNormalRet = React.useMemo(() => {
    return countNormalRef.current++;
  }, [options]);

  const countDeepRet = useDeepCompareMemo(() => {
    return countDeepRef.current++;
  }, [options]);

  return (
    <div>
      <button onClick={() => setOptions({ max: 500 })}>update</button>

      <p>useMemo: {countNormalRet}</p>
      <p>useCustomCompareMemo: {countDeepRet}</p>
    </div>
  );
};

storiesOf('Lifecycle|useDeepCompareMemo', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useDeepCompareMemo.md')} />)
  .add('Demo', () => <Demo />);
