/* eslint-disable */
import { useEffect, useState } from 'react';
import { off, on } from './util';

type PermissionDesc =
  | PermissionDescriptor
  | DevicePermissionDescriptor
  | MidiPermissionDescriptor
  | PushPermissionDescriptor;

type State = PermissionState | '';

const noop = () => {};

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

    // Permissions API is not available in every browser
    if ('permissions' in navigator) {
      navigator.permissions
        .query(permissionDesc)
        .then(status => {
          permissionStatus = status;
          changeState();
        })
        .catch(noop);
    }

    return () => {
      mounted = false;
      permissionStatus && off(permissionStatus, 'change', onChange);
    };
  }, []);

  return state;
};

export default usePermission;
