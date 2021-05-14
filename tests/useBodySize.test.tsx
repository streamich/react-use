import { renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useBodySize from '../src/useBodySize';
import { isClient } from '../src/util';

declare var requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

describe('useBodySize', () => {
  beforeAll(() => {
    replaceRaf();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
  });

  it('should be defined', () => {
    expect(useBodySize).toBeDefined();
  });

  function getHook(...args) {
    return renderHook(() => useBodySize(...args));
  }

  it('should return current body dimensions', () => {
    const hook = getHook();

    expect(typeof hook.result.current).toBe('object');
    expect(typeof hook.result.current.height).toBe('number');
    expect(typeof hook.result.current.width).toBe('number');
  });

  it('should use passed parameters as initial values in case of non-browser use', () => {
    const hook = getHook(1, 1);

    expect(hook.result.current.height).toBe(isClient ? document.body.clientHeight : 1);
    expect(hook.result.current.width).toBe(isClient ? document.body.clientWidth : 1);
  });
});
