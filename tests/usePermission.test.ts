import { renderHook } from '@testing-library/react-hooks';
import usePermission from '../src/usePermission';

it('should avoid throwing an exception if permissions API is missing', () => {
  const { result } = renderHook(() => usePermission({ name: 'notifications' }));

  expect(result.current).toBe('');
});

it('should return permission state', async () => {
  const status: Partial<PermissionStatus> = {
    state: 'prompt',
    addEventListener() {},
    removeEventListener() {},
  };

  (navigator as any).permissions = {
    query: jest.fn().mockResolvedValue(status),
  } as Permissions;

  const { result, waitForNextUpdate } = renderHook(() => usePermission({ name: 'notifications' }));

  await waitForNextUpdate();

  expect(result.current).toBe('prompt');
});

it('should listen to permission changes', async () => {
  const status: Partial<PermissionStatus> = {
    state: 'prompt',
    addEventListener(_event, callback) {
      setTimeout(() => {
        (status as any).state = 'granted';
        callback();
      }, 100);
    },
    removeEventListener() {},
  };

  (navigator as any).permissions = {
    query: jest.fn().mockResolvedValue(status),
  } as Permissions;

  const { result, waitForNextUpdate } = renderHook(() => usePermission({ name: 'notifications' }));

  await waitForNextUpdate();

  expect(result.current).toBe('prompt');

  await waitForNextUpdate();

  expect(result.current).toBe('granted');
});

it('should stop listening to changes when unmounted', async () => {
  const removeEventListener = jest.fn();
  const status: Partial<PermissionStatus> = {
    state: 'prompt',
    addEventListener() {},
    removeEventListener,
  };

  (navigator as any).permissions = {
    query: jest.fn().mockResolvedValue(status),
  } as Permissions;

  const { waitForNextUpdate, unmount } = renderHook(() => usePermission({ name: 'notifications' }));

  await waitForNextUpdate();

  unmount();

  expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
});
