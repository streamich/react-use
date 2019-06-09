import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useRef } from 'react';
import { useResizeObserver } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { width, height } = useResizeObserver();
  console.log('wh', width, height);

  return (
    <div>
      <div style={{ border: '1px solid red' }} ref={ref}>
        Size me up! ({width}px, {height}px)
      </div>
    </div>
  );
};

storiesOf('Sensors|useResizeObserver', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useResizeObserver.md')} />)
  .add('Demo', () => <Demo />);
