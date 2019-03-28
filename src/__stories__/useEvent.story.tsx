import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useEvent, useList} from '..';
import ShowDocs from '../util/ShowDocs';
import {CenterStory} from './util/CenterStory';

const {useCallback} = React;

const Demo = () => {
  const [list, {push, clear}] = useList();

  useEvent('keydown', useCallback(({key}) => {
    if (key === 'r') clear();
    push(key);
  }, []));

  return (
    <CenterStory>
      <p>
        Press some keys on your keyboard, <code style={{color: 'tomato'}}>r</code> key resets the list
      </p>
      <pre>
        {JSON.stringify(list, null, 4)}
      </pre>
    </CenterStory>
  );
};

storiesOf('Sensors|useEvent', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useFavicon.md')} />)
  .add('Demo', () =>
    <Demo />
  )
