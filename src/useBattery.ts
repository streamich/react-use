import { useEffect, useState } from 'react';
import { isNavigator, off, on } from './misc/util';
import isDeepEqual from './misc/isDeepEqual';

export interface BatteryState {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

type BatteryManager = {
  [Property in keyof BatteryState as `on${Property}change`]: () => void
} & BatteryState & EventTarget

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
    let savedBatteryManager: BatteryManager | null = null;

    const handleChange = (e) => {
      if (!isMounted || !savedBatteryManager) {
        return;
      }

      const target: BatteryState = e.target
      const newState: UseBatteryState = {
        isSupported: true,
        fetched: true,
        level: target.level,
        charging: target.charging,
        dischargingTime: target.dischargingTime,
        chargingTime: target.chargingTime,
      };
      !isDeepEqual(state, newState) && setState(newState);
    };

    nav!.getBattery!().then((batteryManager: BatteryManager) => {
      if (!isMounted) {
        return;
      }
      savedBatteryManager = batteryManager;
      on(savedBatteryManager, 'chargingchange', handleChange);
      on(savedBatteryManager, 'chargingtimechange', handleChange);
      on(savedBatteryManager, 'dischargingtimechange', handleChange);
      on(savedBatteryManager, 'levelchange', handleChange);
      handleChange({ target: savedBatteryManager });
    });

    return () => {
      isMounted = false;
      if (savedBatteryManager) {
        off(savedBatteryManager, 'chargingchange', handleChange);
        off(savedBatteryManager, 'chargingtimechange', handleChange);
        off(savedBatteryManager, 'dischargingtimechange', handleChange);
        off(savedBatteryManager, 'levelchange', handleChange);
      }
    };
  }, []);

  return state;
}

export default isBatteryApiSupported ? useBattery : useBatteryMock;
