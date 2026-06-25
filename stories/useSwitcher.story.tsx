import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useSwitcher } from '../src';
import NewTabStory from './util/NewTabStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { isSwitchedOn, switchOff, switchOn, toggleSwitcher } = useSwitcher();

  return (
    <NewTabStory>
      Change state of checkbox by pressing checkbox or buttons below
      <br />
      <br />
      <input type="checkbox" checked={isSwitchedOn} onClick={toggleSwitcher} />
      <br />
      <br />
      <button onClick={switchOn}>Switch On</button>
      <button onClick={switchOff}>Switch Off</button>
      <button onClick={toggleSwitcher}>Toggle</button>
    </NewTabStory>
  );
};

storiesOf('State/useSwitcher', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useSwitcher.md')} />)
  .add('Demo', () => <Demo />);
