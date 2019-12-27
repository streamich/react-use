import { renderHook } from '@testing-library/react-hooks';
import * as useNotification from '../useNotification';

const globalAny: any = global;

describe('useNotification', () => {
  it('should be defines', () => {
    expect(useNotification).toBeDefined();
  });

  it('should request permission if it has not been granted', () => {
    const spy = jest.spyOn(useNotification, 'requestPermission').mockReturnValue(null);
    globalAny.Notification = {
      permission: 'default',
    };

    renderHook(() => useNotification.default('Test Notification', {}));

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('should not request permission if it has been denied', () => {
    const spy = jest.spyOn(useNotification, 'requestPermission').mockReturnValue(null);
    globalAny.Notification = {
      permission: 'denied',
    };

    renderHook(() => useNotification.default('Test Notification', {}));

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should return a function that creates a notification with the passed title and options if permission has been granted', () => {
    const spy = jest.fn();
    globalAny.Notification = class Notification {
      constructor(title, options) {
        spy(title, options);
      }
    };
    globalAny.Notification.permission = 'granted';

    const { result } = renderHook(() => useNotification.default('Test Notification', { body: 'Hi' }));

    expect(spy).not.toHaveBeenCalled();

    result.current();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith('Test Notification', { body: 'Hi' });
  });

  it('should return a function that does not create a notification if permission has not been granted', () => {
    const spy = jest.fn();
    globalAny.Notification = class Notification {
      constructor(title, options) {
        spy(title, options);
      }
    };
    globalAny.Notification.permission = 'denied';

    const { result } = renderHook(() => useNotification.default('Test Notification', { body: 'Hi' }));

    expect(spy).not.toHaveBeenCalled();

    result.current();

    expect(spy).not.toHaveBeenCalled();
  });

  describe('requestPermission', () => {
    it('should call the passed function with the result of Notification.requestPermission()', async () => {
      const notificationPermissionMock = jest.fn().mockReturnValue(new Promise(resolve => resolve('granted')));
      globalAny.Notification = {
        permission: 'default',
        requestPermission: notificationPermissionMock,
      };

      const setPermissionMock = jest.fn();

      await useNotification.requestPermission(setPermissionMock);

      expect(setPermissionMock).toHaveBeenCalledTimes(1);
      expect(setPermissionMock).toHaveBeenCalledWith('granted');
    });
  });
});
