import { useEffect, useState } from 'react';
import { isNavigator, off, on } from './misc/util';

interface State {
  devices: Omit<MediaDeviceInfo, 'toJSON'>[];
}

const useMediaDevices = () => {
  const [state, setState] = useState<State>({ devices: [] });

  useEffect(() => {
    let mounted = true;

    const onChange = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        if (mounted) {
          setState({
            devices: devices.map(({ deviceId, groupId, kind, label }) => ({
              deviceId,
              groupId,
              kind,
              label,
            })),
          });
        }
      } catch (err) {}
    };

    on(navigator.mediaDevices, 'devicechange', onChange);
    onChange();

    return () => {
      mounted = false;
      off(navigator.mediaDevices, 'devicechange', onChange);
    };
  }, []);

  return state;
};

const useMediaDevicesMock = (): State => ({ devices: [] });

export default isNavigator && !!navigator.mediaDevices ? useMediaDevices : useMediaDevicesMock;
