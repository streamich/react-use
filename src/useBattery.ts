import { useEffect, useState } from 'react';
import { off, on } from './util';

export interface BatterySensorState {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

const useBattery = () => {
  const [state, setState] = useState({});
  let mounted = true;
  let battery: any = null;

  const onChange = () => {
    const { charging, level, chargingTime, dischargingTime } = battery;
    setState({
      charging,
      level,
      chargingTime,
      dischargingTime,
    });
  };

  const onBattery = () => {
    onChange();
    on(battery, 'chargingchange', onChange);
    on(battery, 'levelchange', onChange);
    on(battery, 'chargingtimechange', onChange);
    on(battery, 'dischargingtimechange', onChange);
  };

  useEffect(() => {
    (navigator as any).getBattery().then((bat: any) => {
      if (mounted) {
        battery = bat;
        onBattery();
      }
    });

    return () => {
      mounted = false;
      if (battery) {
        off(battery, 'chargingchange', onChange);
        off(battery, 'levelchange', onChange);
        off(battery, 'chargingtimechange', onChange);
        off(battery, 'dischargingtimechange', onChange);
      }
    };
  }, []);

  return state;
};

export default useBattery;
