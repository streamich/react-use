import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useCss} from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const className = useCss({
    color: 'red',
    border: '1px solid red',
    '&:hover': {
      color: 'blue',
    },
  });

  return (
    <div className={className}>
      hello
    </div>
  );
};

storiesOf('UI|useCss', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCss.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
