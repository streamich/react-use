import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useCounter, useDeepCompareEffect } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [countNormal, { inc: incNormal }] = useCounter(0);
  const [countDeep, { inc: incDeep }] = useCounter(0);
  const options = { max: 500 };

  React.useEffect(() => {
    if (countNormal < options.max) {
      incNormal();
    }
  }, [options]);

  useDeepCompareEffect(() => {
    if (countNormal < options.max) {
      incDeep();
    }
  }, [options]);

  return (
    <div>
      <p>useEffect: {countNormal}</p>
      <p>useDeepCompareEffect: {countDeep}</p>
    </div>
  );
};

storiesOf('Lifecycle/useDeepCompareEffect', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useDeepCompareEffect.md')} />)
  .add('Demo', () => <Demo />);
