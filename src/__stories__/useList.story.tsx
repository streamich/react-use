import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useList} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  const [list, {set, push}] = useList();

  return (
    <div>
      <div>{list.join(',')}</div>
      <button onClick={() => set([])}>Reset</button>
      <button onClick={() => push(Date.now())}>Push</button>
    </div>
  );
};

storiesOf('State/useList', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useList.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
