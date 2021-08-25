import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSpeech } from '../src';
import ShowDocs from './util/ShowDocs';

const voices = window.speechSynthesis.getVoices();

const Demo = () => {
  const state = useSpeech('Hello world!', { rate: 0.8, pitch: 0.5, voice: voices[0] });

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

storiesOf('UI/useSpeech', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSpeech.md')} />)
  .add('Demo', () => <Demo />);
