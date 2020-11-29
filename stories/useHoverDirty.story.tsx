import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRef } from 'react';
import { useHoverDirty } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const ref = useRef(null);
  const isHovered = useHoverDirty(ref);

  return <div ref={ref}>{isHovered ? '😁' : '☹️'}</div>;
};

storiesOf('Sensors/useHoverDirty', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useHover.md')} />)
  .add('Demo', () => <Demo />);
