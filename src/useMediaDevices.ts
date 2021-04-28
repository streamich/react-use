import { useEffect, useState } from 'react';
import useMountedState from './useMountedState';
import { isNavigator, noop, off, on } from './misc/util';

const useMediaDevices = () => {
  const [state, setState] = useState({});
  const isMounted = useMountedState();

  useEffect(() => {
    const onChange = () => {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          if (isMounted()) {
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
      off(navigator.mediaDevices, 'devicechange', onChange);
    };
  }, []);

  return state;
};

const useMediaDevicesMock = () => ({});

export default isNavigator && !!navigator.mediaDevices ? useMediaDevices : useMediaDevicesMock;
