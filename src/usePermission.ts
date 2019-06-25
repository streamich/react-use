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

  useEffect(() => {
    let permissionStatus: PermissionStatus | null = null;

    const onChange = () => permissionStatus && setState(permissionStatus.state);

    navigator.permissions
      .query(permissionDesc)
      .then(status => {
        permissionStatus = status;
        on(permissionStatus, 'change', () => setState(status.state));
        setState(status.state);
      })
      .catch(noop);

    return () => {
      permissionStatus && off(permissionStatus, 'change', onChange);
      permissionStatus = null;
    };
  }, []);

  return state;
};

export default usePermission;
