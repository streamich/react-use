import { useEffect, useState } from 'react';
import { off, on } from './util';

type PermissionDesc =
  | PermissionDescriptor
  | DevicePermissionDescriptor
  | MidiPermissionDescriptor
  | PushPermissionDescriptor;

const noop = () => {};

const usePermission = (permissionDesc: PermissionDesc): string => {
  const [state, setState] = useState('');
  let mounted = true;
  let permissionStatus: PermissionStatus | null = null;

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
      .then(status => {
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
