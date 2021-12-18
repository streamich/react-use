import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCounter, useCustomCompareEffect } from '../src';
import ShowDocs from './util/ShowDocs';
import isDeepEqual from '../src/misc/isDeepEqual';

const Demo = () => {
  const [countNormal, { inc: incNormal }] = useCounter(0);
  const [countDeep, { inc: incDeep }] = useCounter(0);
  const options = { max: 500 };

  React.useEffect(() => {
    if (countNormal < options.max) {
      incNormal();
    }
  }, [options]);

  useCustomCompareEffect(
    () => {
      if (countNormal < options.max) {
        incDeep();
      }
    },
    [options],
    (prevDeps, nextDeps) => isDeepEqual(prevDeps, nextDeps)
  );

  return (
    <div>
      <p>useEffect: {countNormal}</p>
      <p>useCustomCompareEffect: {countDeep}</p>
    </div>
  );
};

storiesOf('Lifecycle/useCustomCompareEffect', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useCustomCompareEffect.md')} />)
  .add('Demo', () => <Demo />);
