import { act, renderHook } from '@testing-library/react-hooks';
import usePermission, { IPermissionDescriptor } from '../src/usePermission';

const createPermissionStatus = (state: PermissionState) =>
  Object.assign(new EventTarget(), { state, onchange: null });

const createPendingQuery = () => {
  let resolve!: (status: PermissionStatus) => void;
  const promise = new Promise<PermissionStatus>((resolveQuery) => {
    resolve = resolveQuery;
  });
  return { promise, resolve };
};

describe('usePermission', () => {
  const originalPermissions = Object.getOwnPropertyDescriptor(navigator, 'permissions');
  const descriptor: IPermissionDescriptor = { name: 'geolocation' };
  let query: jest.Mock;

  beforeEach(() => {
    query = jest.fn();
    Object.defineProperty(navigator, 'permissions', {
      configurable: true,
      value: { query },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    if (originalPermissions) {
      Object.defineProperty(navigator, 'permissions', originalPermissions);
    } else {
      delete (navigator as any).permissions;
    }
  });

  it('updates the permission state and removes its listener on unmount', async () => {
    const pending = createPendingQuery();
    const status = createPermissionStatus('prompt');
    const addListener = jest.spyOn(status, 'addEventListener');
    const removeListener = jest.spyOn(status, 'removeEventListener');
    query.mockReturnValue(pending.promise);

    const { result, unmount } = renderHook(() => usePermission(descriptor));
    expect(result.current).toBe('');
    expect(query).toHaveBeenCalledWith(descriptor);

    await act(async () => {
      pending.resolve(status);
    });
    expect(result.current).toBe('prompt');
    expect(addListener).toHaveBeenCalledTimes(1);
    expect(addListener).toHaveBeenCalledWith('change', expect.any(Function));

    act(() => {
      status.state = 'granted';
      status.dispatchEvent(new Event('change'));
    });
    expect(result.current).toBe('granted');

    unmount();
    expect(removeListener).toHaveBeenCalledTimes(1);
    expect(removeListener).toHaveBeenCalledWith('change', addListener.mock.calls[0][1]);
  });

  it('does not add a listener when the query resolves after unmount', async () => {
    const pending = createPendingQuery();
    const status = createPermissionStatus('granted');
    const addListener = jest.spyOn(status, 'addEventListener');
    query.mockReturnValue(pending.promise);

    const { unmount } = renderHook(() => usePermission(descriptor));
    unmount();

    await act(async () => {
      pending.resolve(status);
    });
    expect(addListener).not.toHaveBeenCalled();
  });

  it('ignores an obsolete query without affecting the new listener', async () => {
    const previous = createPendingQuery();
    const current = createPendingQuery();
    const previousStatus = createPermissionStatus('denied');
    const currentStatus = createPermissionStatus('granted');
    const addPreviousListener = jest.spyOn(previousStatus, 'addEventListener');
    const addCurrentListener = jest.spyOn(currentStatus, 'addEventListener');
    const removeCurrentListener = jest.spyOn(currentStatus, 'removeEventListener');
    const nextDescriptor: IPermissionDescriptor = { name: 'notifications' };
    query.mockReturnValueOnce(previous.promise).mockReturnValueOnce(current.promise);

    const { result, rerender, unmount } = renderHook((value) => usePermission(value), {
      initialProps: descriptor,
    });
    rerender(nextDescriptor);

    await act(async () => {
      current.resolve(currentStatus);
    });
    expect(result.current).toBe('granted');

    await act(async () => {
      previous.resolve(previousStatus);
    });
    expect(addPreviousListener).not.toHaveBeenCalled();
    expect(addCurrentListener).toHaveBeenCalledTimes(1);
    expect(result.current).toBe('granted');

    act(() => {
      currentStatus.state = 'prompt';
      currentStatus.dispatchEvent(new Event('change'));
    });
    expect(result.current).toBe('prompt');

    unmount();
    expect(removeCurrentListener).toHaveBeenCalledWith(
      'change',
      addCurrentListener.mock.calls[0][1]
    );
  });

  it('keeps the empty state when querying the permission rejects', async () => {
    const addListener = jest.spyOn(EventTarget.prototype, 'addEventListener');
    query.mockRejectedValue(new Error('Permission query failed'));

    const { result, unmount } = renderHook(() => usePermission(descriptor));
    await act(async () => {});

    expect(result.current).toBe('');
    expect(query).toHaveBeenCalledTimes(1);
    expect(addListener).not.toHaveBeenCalledWith('change', expect.any(Function));
    unmount();
  });
});
