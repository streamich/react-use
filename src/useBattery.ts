import { useEffect, useState } from 'react';
import { isNavigator, off, on } from './misc/util';
import isDeepEqual from './misc/isDeepEqual';

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
  | (BatteryState & { isSupported: true; fetched: true }); // battery API supported and fetched

const nav: NavigatorWithPossibleBattery | undefined = isNavigator ? navigator : undefined;
const isBatteryApiSupported = nav && typeof nav.getBattery === 'function';

function useBatteryMock(): UseBatteryState {
  return { isSupported: false };
}

function useBattery(): UseBatteryState {
  const [state, setState] = useState<UseBatteryState>({ isSupported: true, fetched: false });

  useEffect(() => {
    let isMounted = true;
    let battery: BatteryManager | null = null;

    const handleChange = () => {
      if (!isMounted || !battery) {
        return;
      }
      const newState: UseBatteryState = {
        isSupported: true,
        fetched: true,
        level: battery.level,
        charging: battery.charging,
        dischargingTime: battery.dischargingTime,
        chargingTime: battery.chargingTime,
      };
      !isDeepEqual(state, newState) && setState(newState);
    };

    nav!.getBattery!().then((bat: BatteryManager) => {
      if (!isMounted) {
        return;
      }
      battery = bat;
      on(battery, 'chargingchange', handleChange);
      on(battery, 'chargingtimechange', handleChange);
      on(battery, 'dischargingtimechange', handleChange);
      on(battery, 'levelchange', handleChange);
      handleChange();
    });

    return () => {
      isMounted = false;
      if (battery) {
        off(battery, 'chargingchange', handleChange);
        off(battery, 'chargingtimechange', handleChange);
        off(battery, 'dischargingtimechange', handleChange);
        off(battery, 'levelchange', handleChange);
      }
    };
  }, []);

  return state;
}

export default isBatteryApiSupported ? useBattery : useBatteryMock;
