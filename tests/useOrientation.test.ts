import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useOrientation from '../src/useOrientation';
import { isClient } from '../src/util';

declare var requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

describe('useOrientation', () => {
  beforeAll(() => {
    replaceRaf();
    (window.screen.orientation as object) = {
      type: 'landscape-primary',
      angle: 0,
    };
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

  it('should use passed parameters as initial values in case of non-browser use', () => {
    const hook = getHook({
      angle: 90,
      type: 'portrait-primary'
    });

    expect(hook.result.current.type).toBe(isClient ? window.screen.orientation.type : 'portrait-primary');
    expect(hook.result.current.angle).toBe(isClient ? window.screen.orientation.angle : 90);
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
});
