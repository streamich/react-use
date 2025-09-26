import { renderHook } from '@testing-library/react-hooks';
import useSignallingEffect from '../src/useSignallingEffect';

const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

describe('useSignallingEffect', () => {
  it('should be defined', () => {
    expect(useSignallingEffect).toBeDefined();
  });

  it('should run provided effect', () => {
    renderHook(() => useSignallingEffect(mockEffectCallback));
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);
  });

  it('should run clean-up if returned by effect', () => {
    const { unmount } = renderHook(() => useSignallingEffect(mockEffectCallback));
    expect(mockEffectCleanup).not.toHaveBeenCalled();

    unmount();
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
  });

  it('should account for dependencies list', () => {
    const { rerender } = renderHook(({ dep }) => useSignallingEffect(mockEffectCallback, [dep]), {
      initialProps: { dep: 1, notDep: 1 },
    });
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);
    expect(mockEffectCleanup).not.toHaveBeenCalled();

    rerender({ dep: 2, notDep: 1 });
    expect(mockEffectCallback).toHaveBeenCalledTimes(2);
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);

    rerender({ dep: 2, notDep: 2 });
    expect(mockEffectCallback).toHaveBeenCalledTimes(2);
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
  });

  it('should send about signal', () => {
    const mockAbortSignalListener = jest.fn();
    const { unmount } = renderHook(() =>
      useSignallingEffect((signal) => {
        signal.addEventListener('abort', mockAbortSignalListener);
      })
    );

    unmount();
    expect(mockAbortSignalListener).toHaveBeenCalledTimes(1);
  });

  it('should abort signal before clean-up', () => {
    let wasAborted = false;
    const { unmount } = renderHook(() =>
      useSignallingEffect((signal) => () => {
        wasAborted = signal.aborted;
      })
    );

    unmount();
    expect(wasAborted).toBeTruthy();
  });
});
