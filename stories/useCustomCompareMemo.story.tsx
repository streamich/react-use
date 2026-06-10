import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCustomCompareMemo } from '../src';
import { isDeepEqual } from '../src/util';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [options, setOptions] = React.useState({ max: 500 });
  const countNormalRef = React.useRef(0);
  const countDeepRef = React.useRef(0);

  const countNormalRet = React.useMemo(() => {
    return countNormalRef.current++;
  }, [options]);

  const countDeepRet = useCustomCompareMemo(
    () => {
      return countDeepRef.current++;
    },
    [options],
    (prevDeps, nextDeps) => isDeepEqual(prevDeps, nextDeps)
  );

  return (
    <div>
      <button onClick={() => setOptions({ max: 500 })}>update</button>

      <p>useMemo: {countNormalRet}</p>
      <p>useCustomCompareMemo: {countDeepRet}</p>
    </div>
  );
};

storiesOf('Lifecycle|useCustomCompareMemo', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCustomCompareMemo.md')} />)
  .add('Demo', () => <Demo />);
