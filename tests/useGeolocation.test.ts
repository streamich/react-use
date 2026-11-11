import React from 'react';
import { act, cleanup, renderHook } from '@testing-library/react-hooks';
import useGeolocation from '../src/useGeolocation';

describe('useGeolocation effect replay', () => {
  const originalUseEffect = React.useEffect;
  const originalGeolocation = Object.getOwnPropertyDescriptor(navigator, 'geolocation');
  let successes: PositionCallback[];
  let errors: PositionErrorCallback[];
  const clearWatch = jest.fn();

  beforeEach(() => {
    successes = [];
    errors = [];
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: jest.fn(),
        watchPosition: jest.fn((success, error) => {
          successes.push(success);
          errors.push(error);
          return successes.length;
        }),
        clearWatch,
      },
    });
    // Exercise setup/cleanup/setup with the repository's React 17 test renderer.
    jest.spyOn(React, 'useEffect').mockImplementation((effect, deps) => {
      originalUseEffect(() => {
        const cleanup = effect();
        if (cleanup) cleanup();
        return effect();
      }, deps);
    });
  });

  afterEach(async () => {
    await cleanup();
    jest.restoreAllMocks();
    if (originalGeolocation) {
      Object.defineProperty(navigator, 'geolocation', originalGeolocation);
    } else {
      delete (navigator as any).geolocation;
    }
  });

  it('receives positions from the active watcher after replay', () => {
    const { result, unmount } = renderHook(() => useGeolocation());
    const position = {
      coords: {
        accuracy: 1,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 32,
        longitude: 34,
        speed: null,
      },
      timestamp: 123,
    } as GeolocationPosition;

    act(() => successes[1](position));
    expect(result.current.loading).toBe(false);
    expect(result.current.latitude).toBe(32);
    expect(clearWatch).toHaveBeenCalledWith(1);

    const previous = result.current;
    act(() => successes[0]({ ...position, timestamp: 456 }));
    expect(result.current).toBe(previous);
    unmount();
    expect(clearWatch).toHaveBeenCalledWith(2);
  });

  it('receives errors from the active watcher after replay', () => {
    const { result } = renderHook(() => useGeolocation());
    const error = {
      code: 1,
      message: 'Permission denied',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    } as GeolocationPositionError;

    act(() => {
      errors[1](error);
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(error);
  });
});
