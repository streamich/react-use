import { useEffect, useState } from 'react';
import { noop, off, on } from './misc/util';

export type IState = PermissionState | 'unavailable' | '';

interface IPushPermissionDescriptor extends PermissionDescriptor {
  name: 'push';
  userVisibleOnly?: boolean;
}

interface IMidiPermissionDescriptor extends PermissionDescriptor {
  name: 'midi';
  sysex?: boolean;
}

interface IDevicePermissionDescriptor extends PermissionDescriptor {
  name: 'camera' | 'microphone' | 'speaker';
  deviceId?: string;
}

export type IPermissionDescriptor =
  | PermissionDescriptor
  | IPushPermissionDescriptor
  | IMidiPermissionDescriptor
  | IDevicePermissionDescriptor;

// const usePermission = <T extends PermissionDescriptor>(permissionDesc: T): IState => {
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

    if ('permissions' in navigator) {
      navigator.permissions
        .query(permissionDesc)
        .then((status) => {
          permissionStatus = status;
          on(permissionStatus, 'change', onChange);
          onChange();
        })
        .catch(noop);
    } else {
      setState('unavailable');
    }

    return () => {
      permissionStatus && off(permissionStatus, 'change', onChange);
      mounted = false;
      permissionStatus = null;
    };
  }, [permissionDesc]);

  return state;
};

export default usePermission;
