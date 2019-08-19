import * as React from 'react';
import { off, on } from './util';

enum BatteryManagerEvents {
  levelChange = 'levelchange',
  dischargingTimeChange = 'dischargingtimechange',
  chargingTimeChange = 'chargingtimechange',
  chargingChange = 'chargingchange',
}

export interface BatteryState {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

interface BatteryManager extends Readonly<BatteryState>, EventTarget {
  onchargingchange: () => void;
  onchargingtimechange: () => void;
  ondischargingtimechange: () => void;
  onlevelchange: () => void;
}

interface NavigatorWithPossibleBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

const nav: NavigatorWithPossibleBattery = navigator;

type UseBatteryState = BatteryState & {
  isSupported: boolean;
};

export default function useBattery() {
  const [state, setState] = React.useState<UseBatteryState>({
    isSupported: nav && typeof nav.getBattery !== 'undefined',
    level: 1,
    charging: true,
    dischargingTime: Infinity,
    chargingTime: 0,
  });
  const battery = React.useRef<BatteryManager>();
  let isMounted = true;

  if (state.isSupported) {
    const onChange = React.useCallback(() => {
      if (isMounted && battery.current) {
        setState({
          isSupported: true,
          level: battery.current.level,
          charging: battery.current.charging,
          dischargingTime: battery.current.dischargingTime,
          chargingTime: battery.current.chargingTime,
        });
      }
    }, [setState]);

    const bindBatteryEvents = React.useCallback(
      (bat: BatteryManager) => {
        on(bat, BatteryManagerEvents.chargingChange, onChange);
        on(bat, BatteryManagerEvents.chargingTimeChange, onChange);
        on(bat, BatteryManagerEvents.dischargingTimeChange, onChange);
        on(bat, BatteryManagerEvents.levelChange, onChange);
      },
      [onChange]
    );

    const unbindBatteryEvents = React.useCallback(
      (bat: BatteryManager) => {
        off(bat, BatteryManagerEvents.chargingChange, onChange);
        off(bat, BatteryManagerEvents.chargingTimeChange, onChange);
        off(bat, BatteryManagerEvents.dischargingTimeChange, onChange);
        off(bat, BatteryManagerEvents.levelChange, onChange);
      },
      [onChange]
    );

    React.useEffect(() => {
      battery.current && bindBatteryEvents(battery.current);

      return () => {
        battery.current && unbindBatteryEvents(battery.current);
      };
    }, [onChange]);

    React.useEffect(() => {
      nav.getBattery!().then((bat: BatteryManager) => {
        if (!isMounted) {
          return;
        }

        battery.current = bat;
        bindBatteryEvents(bat);
      });

      return () => {
        isMounted = false;

        battery.current && unbindBatteryEvents(battery.current);
      };
    }, []);
  }

  return state;
}
