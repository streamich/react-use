import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRef } from 'react';
import { useClickAway } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const ref = useRef(null);
  useClickAway<MouseEvent>(ref, action('outside clicked'));

  return (
    <div
      ref={ref}
      style={{
        width: 200,
        height: 200,
        background: 'red',
      }}
    />
  );
};

storiesOf('UI/useClickAway', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useClickAway.md')} />)
  .add('Demo', () => <Demo />);
