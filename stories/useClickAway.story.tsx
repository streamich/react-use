import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRef } from 'react';
import { useClickAway } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  
  useClickAway<MouseEvent>(ref, action('outside clicked'));
  useClickAway<MouseEvent>([ref1, ref2], action('outside clicked blue or green box'));

  return (
    <>
    <div
      ref={ref}
      style={{
        width: 200,
        height: 200,
        background: 'red',
      }}
    />
    <div
      ref={ref1}
      style={{
        width: 200,
        height: 200,
        background: 'green',
      }}
    />
    <div
      ref={ref2}
      style={{
        width: 200,
        height: 200,
        background: 'blue',
      }}
    />
    </>
  );
};

storiesOf('UI/useClickAway', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useClickAway.md')} />)
  .add('Demo', () => <Demo />);
