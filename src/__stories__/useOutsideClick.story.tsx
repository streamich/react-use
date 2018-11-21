import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useOutsideClick} from '..';
import {useRef} from '../react';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const ref = useRef(null);
  useOutsideClick(ref, () => {
    console.log('OUTSIDE CLICKED');
  });

  return (
    <div ref={ref} style={{
      width: 200,
      height: 200,
      background: 'red',
    }} />
  );
};

storiesOf('UI/useOutsideClick', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useOutsideClick.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
