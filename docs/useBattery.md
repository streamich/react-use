# `useBattery`

React sensor hook that tracks battery status.

>**Note:** current `BatteryManager` API state is obsolete.  
>Although it may still work in some browsers, its use is discouraged since it could be removed at any time.


## Usage

```jsx
import {useBattery} from 'react-use';

const Demo = () => {
  const batteryState = useBattery();

  if (!batteryState.isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>not supported</span>
      </div>
    );
  }

  if (!batteryState.fetched) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>supported</span> <br />
        <strong>Battery state</strong>: <span>fetching</span>
      </div>
    );
  }

  return (
    <div>
      <strong>Battery sensor</strong>:&nbsp;&nbsp; <span>supported</span> <br />
      <strong>Battery state</strong>: <span>fetched</span> <br />
      <strong>Charge level</strong>:&nbsp;&nbsp; <span>{ (batteryState.level * 100).toFixed(0) }%</span> <br />
      <strong>Charging</strong>:&nbsp;&nbsp; <span>{ batteryState.charging ? 'yes' : 'no' }</span> <br />
      <strong>Charging time</strong>:&nbsp;&nbsp;
      <span>{ batteryState.chargingTime ? batteryState.chargingTime : 'finished' }</span> <br />
      <strong>Discharging time</strong>:&nbsp;&nbsp; <span>{ batteryState.dischargingTime }</span>
    </div>
  );
};
```

## Reference

```ts
const {isSupported, level, charging, dischargingTime, chargingTime} = useBattery();
```
- **`isSupported`**_`: boolean`_ - whether browser/devise supports BatteryManager;
- **`fetched`**_`: boolean`_ - whether battery state is fetched;
- **`level`**_`: number`_ - representing the system's battery charge level scaled to a value between 0.0 and 1.0.
- **`charging`**_`: boolean`_ - indicating whether or not the battery is currently being charged.
- **`dischargingTime`**_`: number`_ - remaining time in seconds until the battery is completely discharged and the system will suspend.
- **`chargingTime`**_`: number`_ - remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
