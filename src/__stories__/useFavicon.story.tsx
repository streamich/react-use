import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useFavicon} from '..';
import ShowDocs from '../util/ShowDocs';

const Demo = () => {
  useFavicon('https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico');

  return null;
};

storiesOf('Side effects|useFavicon', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useFavicon.md')} />)
  .add('Demo', () =>
    <Demo/>
  )
