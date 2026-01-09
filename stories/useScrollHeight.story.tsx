import { storiesOf } from '@storybook/react';
import { useScrollHeight } from '../src';
import React, { useEffect } from 'react';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const elRef = React.useRef<HTMLDivElement>(null);
  const scrollHeight = useScrollHeight(elRef);

  const [renderElements, setRenderElements] = React.useState<number[]>([]);
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setRenderElements((prev) => [...prev, i]);
      }, i * 3000);
    }
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        height: '200px',
        width: '200px',
        overflow: 'auto',
        border: '1px solid black',
      }}>
      <strong
        style={{
          position: 'sticky',
          top: 0,
          background: 'white',
        }}>
        ScrollHeight: {scrollHeight}
      </strong>
      {renderElements.map((el) => (
        <div
          style={{ height: '50px', width: '200px', background: 'red', marginTop: '20px' }}
          key={el}>
          {el}
        </div>
      ))}
    </div>
  );
};

storiesOf('Sensors/useScrollHeight', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useScrollHeight.md')} />)
  .add('Demo', () => <Demo />);
