import { useState, useEffect } from 'react';
import useMountedState from './useMountedState';
import { noop, off, on } from './misc/util';

type PermissionDesc =
  | PermissionDescriptor
  | DevicePermissionDescriptor
  | MidiPermissionDescriptor
  | PushPermissionDescriptor;

type State = PermissionState | '';

const usePermission = (permissionDesc: PermissionDesc): State => {
  let permissionStatus: PermissionStatus | null = null;

  const [state, setState] = useState<State>('');
  const isMounted = useMountedState();

  const onChange = () => {
    if (isMounted() && permissionStatus) {
      setState(permissionStatus.state);
    }
  };

  const changeState = () => {
    onChange();
    on(permissionStatus, 'change', onChange);
  };

  useEffect(() => {
    navigator.permissions
      .query(permissionDesc)
      .then((status) => {
        permissionStatus = status;
        changeState();
      })
      .catch(noop);

    return () => {
      permissionStatus && off(permissionStatus, 'change', onChange);
    };
  }, []);

  return state;
};

export default usePermission;
