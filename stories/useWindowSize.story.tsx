import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useWindowSize } from '../src';
import { action } from '@storybook/addon-actions'; // Import addon-actions
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { width, height } = useWindowSize({
    // Log the resize event to the Storybook actions panel
    onChange: action('window resize'),
  });

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
};

storiesOf('Sensors/useWindowSize', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useWindowSize.md')} />)
  .add('Demo', () => <Demo />);
