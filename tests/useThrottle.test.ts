import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import useThrottle from '../src/useThrottle';

const renderWithEffectReplay = () => {
  const originalEffect = React.useEffect;
  const effects: React.EffectCallback[] = [];
  let cleanups: ReturnType<React.EffectCallback>[] = [];
  let effectIndex = 0;

  jest.spyOn(React, 'useEffect').mockImplementation((effect, dependencies) => {
    const index = effectIndex++;
    effects[index] = effect;
    originalEffect(() => {
      const cleanup = effect();
      cleanups[index] = cleanup;
      return cleanup;
    }, dependencies);
  });

  const hook = renderHook(
    (value) => {
      effectIndex = 0;
      return useThrottle(value, 100);
    },
    { initialProps: 0 }
  );

  return {
    ...hook,
    replayEffects: () => {
      act(() => {
        cleanups.forEach((cleanup) => cleanup && cleanup());
        cleanups = effects.map((effect) => effect());
      });
    },
  };
};

describe('useThrottle', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('should have a value to be returned', () => {
    const { result } = renderHook(() => useThrottle(0, 100));
    expect(result.current).toBe(0);
  });

  it('should has same value if time is advanced less than the given time', () => {
    const { result, rerender } = renderHook((props) => useThrottle(props, 100), {
      initialProps: 0,
    });
    expect(result.current).toBe(0);
    rerender(1);
    jest.advanceTimersByTime(50);
    expect(result.current).toBe(0);
  });

  it('should update the value after the given time when prop change', (done) => {
    const hook = renderHook((props) => useThrottle(props, 100), { initialProps: 0 });
    expect(hook.result.current).toBe(0);
    hook.rerender(1);
    expect(hook.result.current).toBe(0);
    hook.waitForNextUpdate().then(() => {
      expect(hook.result.current).toBe(1);
      done();
    });
    jest.advanceTimersByTime(100);
  });

  it('should use the default ms value when missing', (done) => {
    const hook = renderHook((props) => useThrottle(props), { initialProps: 0 });
    expect(hook.result.current).toBe(0);
    hook.rerender(1);
    hook.waitForNextUpdate().then(() => {
      expect(hook.result.current).toBe(1);
      done();
    });
    jest.advanceTimersByTime(200);
  });

  it('should not update the value after the given time', () => {
    const hook = renderHook((props) => useThrottle(props, 100), { initialProps: 0 });
    expect(hook.result.current).toBe(0);
    jest.advanceTimersByTime(100);
    expect(hook.result.current).toBe(0);
  });

  it('should cancel timeout on unmount', () => {
    const hook = renderHook((props) => useThrottle(props, 100), { initialProps: 0 });
    expect(hook.result.current).toBe(0);
    hook.rerender(1);
    hook.unmount();
    expect(jest.getTimerCount()).toBe(0);
    jest.advanceTimersByTime(100);
    expect(hook.result.current).toBe(0);
  });

  it('should publish the latest pending value in each throttle interval', () => {
    const { result, rerender } = renderHook((value) => useThrottle(value, 100), {
      initialProps: 0,
    });

    rerender(1);
    rerender(2);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(2);

    rerender(3);
    rerender(4);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(4);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(jest.getTimerCount()).toBe(0);

    rerender(5);
    expect(result.current).toBe(5);
  });

  it('should restart the timeout after effect cleanup and setup are replayed', () => {
    const { result, rerender, replayEffects } = renderWithEffectReplay();

    replayEffects();
    expect(jest.getTimerCount()).toBe(1);
    rerender(1);
    expect(result.current).toBe(0);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(1);

    rerender(2);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(2);
  });

  it('should discard pending values when effects are replayed', () => {
    const { result, rerender, replayEffects } = renderWithEffectReplay();

    rerender(1);
    replayEffects();
    expect(result.current).toBe(1);
    expect(jest.getTimerCount()).toBe(1);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(1);
    expect(jest.getTimerCount()).toBe(0);

    rerender(2);
    expect(result.current).toBe(2);
  });

  it('should keep a single timeout across repeated effect replays', () => {
    const { result, rerender, replayEffects, unmount } = renderWithEffectReplay();

    replayEffects();
    replayEffects();
    replayEffects();
    expect(jest.getTimerCount()).toBe(1);

    rerender(1);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(1);

    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should replay idle effects and clean up without an active timeout', () => {
    const { result, rerender, replayEffects, unmount } = renderWithEffectReplay();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(jest.getTimerCount()).toBe(0);

    replayEffects();
    expect(jest.getTimerCount()).toBe(1);
    rerender(1);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe(1);
    expect(jest.getTimerCount()).toBe(0);

    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });
});
