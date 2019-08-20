import * as React from 'react';
import * as isEqual from 'react-fast-compare';
import { off, on } from './util';

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

type UseBatteryState =
  | { isSupported: false } // Battery API is not supported
  | { isSupported: true; fetched: false } // battery API supported but not fetched yet
  | BatteryState & { isSupported: true; fetched: true }; // battery API supported and fetched

const isBatteryApiSupported =
  typeof navigator === 'object' && typeof (navigator as NavigatorWithPossibleBattery).getBattery === 'function';

function useBatteryMock(): UseBatteryState {
  return { isSupported: false };
}

function useBattery(): UseBatteryState {
  const [state, setState] = React.useState<UseBatteryState>({ isSupported: true, fetched: false });
  const battery = React.useRef<BatteryManager | null>();
  const isMounted = React.useRef(false);

  const handleChange = React.useCallback(() => {
    if (!isMounted.current || !battery.current) {
      return;
    }

    const newState: UseBatteryState = {
      isSupported: true,
      fetched: true,
      level: battery.current.level,
      charging: battery.current.charging,
      dischargingTime: battery.current.dischargingTime,
      chargingTime: battery.current.chargingTime,
    };

    !isEqual(state, newState) && setState(newState);
  }, [state, setState]);

  const bindBatteryEvents = React.useCallback(() => {
    if (!battery.current || !isMounted.current) {
      return;
    }

    on(battery.current, 'chargingchange', handleChange);
    on(battery.current, 'chargingtimechange', handleChange);
    on(battery.current, 'dischargingtimechange', handleChange);
    on(battery.current, 'levelchange', handleChange);
  }, [handleChange]);
  const unbindBatteryEvents = React.useCallback(() => {
    if (!battery.current) {
      return;
    }

    off(battery.current, 'chargingchange', handleChange);
    off(battery.current, 'chargingtimechange', handleChange);
    off(battery.current, 'dischargingtimechange', handleChange);
    off(battery.current, 'levelchange', handleChange);
  }, [handleChange]);

  React.useEffect(() => {
    bindBatteryEvents();
    handleChange(); // this one is for case when update performed between unbind and bind, extremely rare, but better to handle

    return unbindBatteryEvents;
  }, [handleChange]);

  React.useEffect(() => {
    isMounted.current = true;

    (navigator as NavigatorWithPossibleBattery).getBattery!().then((bat: BatteryManager) => {
      battery.current = bat;

      bindBatteryEvents();
      handleChange();
    });

    return () => {
      isMounted.current = false;
      unbindBatteryEvents();
    };
  }, []);

  return state;
}

export default isBatteryApiSupported ? useBattery : useBatteryMock;
