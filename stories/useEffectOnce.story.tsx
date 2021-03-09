import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useEffectOnce } from '../src';
import ConsoleStory from './util/ConsoleStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useEffectOnce(() => {
    console.log('Running effect once on mount');

    return () => {
      console.log('Running clean-up of effect on unmount');
    };
  });

  return <ConsoleStory />;
};

storiesOf('Lifecycle/useEffectOnce', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useEffectOnce.md')} />)
  .add('Demo', () => <Demo />);
