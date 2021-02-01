import { useEffect, useState } from 'react';
import { isNavigator, noop, off, on } from './misc/util';

const useMediaDevices = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    let mounted = true;

    const onChange = () => {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
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
        })
        .catch(noop);
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

const useMediaDevicesMock = () => ({});

export default isNavigator && !!navigator.mediaDevices ? useMediaDevices : useMediaDevicesMock;
