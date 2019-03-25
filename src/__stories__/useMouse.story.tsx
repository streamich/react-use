import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useMouse} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const ref = React.useRef(null);
  const state = useMouse(ref);

  return (
    <>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
      <div
        ref={ref}
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'whitesmoke',
        }}>
        Move your mouse over me
      </div>
    </>
  );
};

storiesOf('Sensors|useMouse', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useMouse.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
