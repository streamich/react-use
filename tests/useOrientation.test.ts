import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useOrientation from '../src/useOrientation';

declare var requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

describe('useOrientation', () => {
  beforeAll(() => {
    replaceRaf();
  });

  beforeEach(() => {
    (window.screen.orientation as object) = {
      type: 'landscape-primary',
      angle: 0,
    };
    (window.orientation as number) = 0;
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it('should be defined', () => {
    expect(useOrientation).toBeDefined();
  });

  function getHook(...args) {
    return renderHook(() => useOrientation(...args));
  }

  function triggerOrientation(type: string, angle: number) {
    (window.screen.orientation.type as string) = type;
    (window.screen.orientation.angle as number) = angle;

    window.dispatchEvent(new Event('orientationchange'));
  }

  it('should return current window orientation', () => {
    const hook = getHook();

    expect(typeof hook.result.current).toBe('object');
    expect(typeof hook.result.current.type).toBe('string');
    expect(typeof hook.result.current.angle).toBe('number');
  });

  it('should use initial values in case of no parameters', () => {
    const hook = getHook();

    expect(hook.result.current.type).toBe('landscape-primary');
    expect(hook.result.current.angle).toBe(0);
  });

  it('should re-render after orientation change on closest RAF', () => {
    const hook = getHook();

    act(() => {
      triggerOrientation('portrait-secondary', 180);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.type).toBe('portrait-secondary');
    expect(hook.result.current.angle).toBe(180);
  });

  it('should return window.orientation number if window.screen.orientation is missing', () => {
    (window.screen.orientation as unknown) = undefined;

    const hook = getHook();

    expect(hook.result.current.type).toBe('');
    expect(hook.result.current.angle).toBe(0);
  });

  it('should return 0 if window.orientation is not a number and if window.screen.orientation is missing', () => {
    (window.screen.orientation as unknown) = undefined;
    (window.orientation as unknown) = null;

    const hook = getHook();

    expect(hook.result.current.type).toBe('');
    expect(hook.result.current.angle).toBe(0);
  });
});
