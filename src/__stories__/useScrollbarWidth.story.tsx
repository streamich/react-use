import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useScrollbarWidth } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const width = useScrollbarWidth();

  return <>Current scrollbar width: {width}px</>;
};

storiesOf('Sensors/useScrollbarWidth', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useScrollbarWidth.md')} />)
  .add('Demo', () => <Demo />);
