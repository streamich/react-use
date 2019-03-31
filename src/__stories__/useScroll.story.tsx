import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useScroll} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const element = React.useRef(null);
  const {x, y} = useScroll(element);

  return (
    <>
      <div>x: {x}</div>
      <div>y: {y}</div>
      <div
        ref={element}
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'whitesmoke',
          overflow: 'scroll'
        }}>
        
        <div style={{width: '2000px', height: '2000px'}}>
          Scroll me
        </div>
      </div>
    </>
  );
};

storiesOf('Sensors/useScroll', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useScroll.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
