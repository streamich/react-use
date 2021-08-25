import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useEvent, useList } from '../src';
import { CenterStory } from './util/CenterStory';
import ShowDocs from './util/ShowDocs';

const { useCallback } = React;

const Demo = () => {
  const [list, { push, clear }] = useList();

  const onKeyDown = useCallback(({ key }) => {
    if (key === 'r') {
      clear();
    }
    push(key);
  }, []);

  useEvent('keydown', onKeyDown);

  return (
    <CenterStory>
      <p>
        Press some keys on your keyboard, <code style={{ color: 'tomato' }}>r</code> key resets the
        list
      </p>
      <pre>{JSON.stringify(list, null, 4)}</pre>
    </CenterStory>
  );
};

storiesOf('Sensors/useEvent', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useEvent.md')} />)
  .add('Demo', () => <Demo />);
