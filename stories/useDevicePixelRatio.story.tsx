import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useDevicePixelRatio } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const pixelRatio = useDevicePixelRatio();

  return (
    <div>
      <div>pixelRatio: {pixelRatio}</div>
    </div>
  );
};

storiesOf('Sensors/useDevicePixelRatio', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useDevicePixelRatio.md')} />)
  .add('Demo', () => <Demo />);
