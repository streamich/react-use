import { useEffect, useState } from 'react';
import { noop, off, on } from './misc/util';

export type IState = PermissionState | '';

interface IPushPermissionDescriptor {
  name: 'push';
  userVisibleOnly?: boolean;
}

interface IMidiPermissionDescriptor {
  name: 'midi';
  sysex?: boolean;
}

interface IDevicePermissionDescriptor {
  name: 'camera' | 'microphone' | 'speaker';
  deviceId?: string;
}

interface IClipboardPermissionDescriptor {
  name: 'clipboard-read' | 'clipboard-write';
}

export type IPermissionDescriptor =
  | PermissionDescriptor
  | IPushPermissionDescriptor
  | IMidiPermissionDescriptor
  | IDevicePermissionDescriptor
  | IClipboardPermissionDescriptor;

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

    navigator.permissions
      .query(permissionDesc as PermissionDescriptor)
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
