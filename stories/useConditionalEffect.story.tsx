import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { useConditionalEffect } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [effectHasRun, setEffectHasRun] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, [setIsLoaded]);

  useConditionalEffect(
    isLoaded,
    () => {
      setEffectHasRun(true);
    },
    [setEffectHasRun]
  );

  return (
    <div>
      <p>{isLoaded ? 'Content is loaded.' : 'Loading will complete after one second.'}</p>
      <p>effectHasRun: {effectHasRun.toString()}</p>
    </div>
  );
};

storiesOf('Lifecycle/useConditionalEffect', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useConditionalEffect.md')} />)
  .add('Demo', () => <Demo />);
