import { storiesOf } from '@storybook/react';
import * as React from 'react';
import UseKey from '../../src/comps/UseKey';

storiesOf('Components|<UseKey>', module).add('Demo', () => (
  <div>
    Press "q" key!
    <UseKey filter="q" fn={() => alert('Q pressed!')} />
  </div>
));
