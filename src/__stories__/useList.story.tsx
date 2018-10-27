import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useList} from '..';

const Demo = () => {
  const [list, {set, push}] = useList();

  return (
    <div>
      <div>{list.join(',')}</div>
      <button onClick={() => set([])}>Rest</button>
      <button onClick={() => push(Date.now())}>Push</button>
    </div>
  );
};

storiesOf('useList', module)
  .add('Example', () =>
    <Demo/>
  )
