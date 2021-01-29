import { useEffect, useState } from 'react';
import { noop, off, on } from './misc/util';

type PermissionDesc =
  | PermissionDescriptor
  | DevicePermissionDescriptor
  | MidiPermissionDescriptor
  | PushPermissionDescriptor;

type State = PermissionState | '';

const usePermission = (permissionDesc: PermissionDesc): State => {
  let mounted = true;
  let permissionStatus: PermissionStatus | null = null;

  const [state, setState] = useState<State>('');

  const onChange = () => {
    if (mounted && permissionStatus) {
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
      mounted = false;
      permissionStatus && off(permissionStatus, 'change', onChange);
    };
  }, []);

  return state;
};

export default usePermission;
