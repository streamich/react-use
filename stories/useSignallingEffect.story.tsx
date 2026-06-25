import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSignallingEffect } from '../src';
import ConsoleStory from './util/ConsoleStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  useSignallingEffect((signal) => {
    window.addEventListener('resize', () => console.log('Window resized'), { signal });
  }, []);

  return <ConsoleStory />;
};

storiesOf('Side effects/useSignallingEffect', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSignallingEffect.md')} />)
  .add('Demo', () => <Demo />);
