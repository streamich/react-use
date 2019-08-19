import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useBattery } from '..';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const batteryState = useBattery();

  if (!batteryState.isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>: <pre>not supported</pre>
      </div>
    );
  }
  return (
    <div>
      <strong>Battery sensor</strong>:&nbsp;&nbsp;<span>supported</span>
      <br />
      <strong>Charge level</strong>:&nbsp;&nbsp;<span>{(batteryState.level * 100).toFixed(0)}%</span>
      <br />
      <strong>Charging</strong>:&nbsp;&nbsp;<span>{batteryState.charging ? 'yes' : 'no'}</span>
      <br />
      <strong>Charging time</strong>:&nbsp;&nbsp;
      <span>{batteryState.chargingTime ? batteryState.chargingTime : 'finished'}</span>
      <br />
      <strong>Discharging time</strong>:&nbsp;&nbsp;<span>{batteryState.dischargingTime}</span>
    </div>
  );
};

storiesOf('Sensors|useBattery', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useBattery.md')} />)
  .add('Demo', () => <Demo />);
