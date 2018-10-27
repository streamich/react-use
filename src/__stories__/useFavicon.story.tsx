import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useFavicon} from '..';

const Demo = () => {
  useFavicon('https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico');

  return null;
};

storiesOf('useFavicon', module)
  .add('Example', () =>
    <Demo/>
  )
