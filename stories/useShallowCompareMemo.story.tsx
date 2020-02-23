import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCounter, useShallowCompareMemo } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [options, setOptions] = React.useState({ nested: { max: 500 } });
  const countNormalRef = React.useRef(0);
  const countShallowRef = React.useRef(0);
  const countDeepRef = React.useRef(0);

  const countNormal = React.useMemo(() => {
    return countNormalRef.current++;
  }, [options.nested]);

  const countShallow = useShallowCompareMemo(() => {
    return countShallowRef.current++;
  }, [options.nested]);

  const countDeep = useShallowCompareMemo(() => {
    return countDeepRef.current++;
  }, [options]);

  return (
    <div>
      <button onClick={() => setOptions({ nested: { max: 500 } })}>update</button>
      <p>useEffect: {countNormal}</p>
      <p>useShallowCompareMemo 1st level change: {countShallow}</p>
      <p>useShallowCompareMemo 2nd level change: {countDeep}</p>
    </div>
  );
};

storiesOf('Lifecycle|useShallowCompareMemo', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useShallowCompareMemo.md')} />)
  .add('Demo', () => <Demo />);
