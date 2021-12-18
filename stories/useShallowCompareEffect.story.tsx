import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCounter, useShallowCompareEffect } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [countNormal, { inc: incNormal }] = useCounter(0);
  const [countShallow, { inc: incShallow }] = useCounter(0);
  const [countDeep, { inc: incDeep }] = useCounter(0);
  const options = { nested: { max: 500 } };

  React.useEffect(() => {
    if (countNormal < options.nested.max) {
      incNormal();
    }
  }, [options.nested]);

  useShallowCompareEffect(() => {
    if (countNormal < options.nested.max) {
      incShallow();
    }
  }, [options.nested]);

  useShallowCompareEffect(() => {
    if (countNormal < options.nested.max) {
      incDeep();
    }
  }, [options]);

  return (
    <div>
      <p>useEffect: {countNormal}</p>
      <p>useShallowCompareEffect 1st level change: {countShallow}</p>
      <p>useShallowCompareEffect 2nd level change: {countDeep}</p>
    </div>
  );
};

storiesOf('Lifecycle/useShallowCompareEffect', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useShallowCompareEffect.md')} />)
  .add('Demo', () => <Demo />);
