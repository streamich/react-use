import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useTrackedEffect, useTimeoutFn } from '../src';
import ConsoleStory from './util/ConsoleStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [deps, setDeps] = React.useState({
    dep1: 0,
    dep2: 0,
    dep3: 0,
  });
  useTrackedEffect(
    (changedDeps) => {
      console.log(`There're ${changedDeps.length} changed dependencies.`);
      console.log(`Indexes of changes:`, changedDeps);

      return () => {
        console.log('Running clean-up of effect on unmount');
      };
    },
    [deps.dep1, deps.dep2, deps.dep3]
  );
  useTimeoutFn(() => {
    console.log('Start change dep 1 and dep 2');
    setDeps({
      ...deps,
      dep1: 1,
      dep2: 1,
    });
  }, 1000);
  useTimeoutFn(() => {
    console.log('Start change dep 1 and dep 3');
    setDeps({
      ...deps,
      dep1: 2,
      dep2: 1,
      dep3: 1,
    });
  }, 2000);
  return <ConsoleStory />;
};

storiesOf('Lifecycle|useTrackedEffect', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useTrackedEffect.md')} />)
  .add('Demo', () => <Demo />);
