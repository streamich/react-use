import { useEffect, useState } from 'react';
import * as thisModule from './useNotification';

export async function requestPermission(setPermission) {
  const permissionFromUser = await Notification.requestPermission();

  setPermission(permissionFromUser);
}

const useNotification = (title: string, options: NotificationOptions): (() => void) => {
  const [permission, setPermission] = useState(
    Notification && Notification.permission ? Notification.permission : 'denied'
  );

  useEffect(() => {
    if (permission !== 'denied' && permission !== 'granted') {
      thisModule.requestPermission(setPermission);
    }
  }, [permission]);

  if (permission === 'granted') {
    return () => {
      new Notification(title, options);
    };
  }

  return () => {};
};

export default useNotification;
