import { storiesOf } from '@storybook/react';
import React, { useRef } from 'react';
import { useMeasure } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [ref, state] = useMeasure();
  const stateArgs = useMeasure(elementRef);

  return (
    <>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <div ref={ref} style={{ background: 'red' }}>
          resize me
        </div>
      </div>
      <div>
        <pre>{JSON.stringify(stateArgs, null, 2)}</pre>
        <div ref={elementRef} style={{ background: 'red' }}>
          resize me (ref passed in the arguments)
        </div>
      </div>
    </>
  );
};

storiesOf('Sensors|useMeasure', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMeasure.md')} />)
  .add('Demo', () => <Demo />);
