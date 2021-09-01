import { useEffect, useState } from 'react';
import { noop, off, on } from './misc/util';

export type IState = PermissionState | '';

interface ExtendedExperimentalPermissions extends Permissions {
  query(permissionDesc: IPermissionDescriptor): ReturnType<Permissions['query']>;
}

interface ExperimentalPushPermissionDescriptor {
  name: 'push';
  userVisibleOnly?: boolean;
}

interface ExperimentalMidiPermissionDescriptor {
  name: 'midi';
  sysex?: boolean;
}

interface ExperimentalDevicePermissionDescriptor {
  name: 'camera' | 'microphone' | 'speaker';
  deviceId?: string;
}

export type IPermissionDescriptor =
  | PermissionDescriptor
  | ExperimentalDevicePermissionDescriptor
  | ExperimentalMidiPermissionDescriptor
  | ExperimentalPushPermissionDescriptor;

const usePermission = (permissionDesc: IPermissionDescriptor): IState => {
  const [state, setState] = useState<IState>('');

  useEffect(() => {
    let mounted = true;
    let permissionStatus: PermissionStatus | null = null;

    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(() => permissionStatus?.state ?? '');
    };

    (navigator.permissions as ExtendedExperimentalPermissions)
      .query(permissionDesc)
      .then((status) => {
        permissionStatus = status;
        on(permissionStatus, 'change', onChange);
        onChange();
      })
      .catch(noop);

    return () => {
      permissionStatus && off(permissionStatus, 'change', onChange);
      mounted = false;
      permissionStatus = null;
    };
  }, [permissionDesc]);

  return state;
};

export default usePermission;
