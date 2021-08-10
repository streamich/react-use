import { useEffect, useState } from 'react';
import { noop, off, on } from './misc/util';

export type IState = PermissionState | '';

const usePermission = (permissionDesc: PermissionDescriptor): IState => {
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
  }, []);

  return state;
};

export default usePermission;
