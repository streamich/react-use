import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useWindowSize from '../useWindowSize';

interface RequestAnimationFrame {
  reset(): void;
  step(): void;
}

declare var requestAnimationFrame: RequestAnimationFrame;

replaceRaf();

beforeEach(() => {
  requestAnimationFrame.reset();
});

afterEach(() => {
  requestAnimationFrame.reset();
});

// simulate window resize
function fireResize(type, value) {
  switch (type) {
    case 'width':
      (window.innerWidth as number) = value; // assert type of window.innerWidth as it is typed as readonly.
      break;
    case 'height':
      (window.innerHeight as number) = value; // assert type of window.innerHeight as it is typed as readonly.
      break;
    default:
      break;
  }

  window.dispatchEvent(new Event('resize'));
}

describe('useWindowSize', () => {
  it('should be defined', () => {
    expect(useWindowSize).toBeDefined();
  });

  const hook = renderHook(() => useWindowSize());

  it('should update width', () => {
    act(() => {
      fireResize('width', 320);
      requestAnimationFrame.step();
    });

    expect(hook.result.current.width).toBe(320);

    act(() => {
      fireResize('width', 640);
      requestAnimationFrame.step();
    });
    expect(hook.result.current.width).toBe(640);
  });

  it('should update height', () => {
    act(() => {
      fireResize('height', 500);
      requestAnimationFrame.step();
    });
    expect(hook.result.current.height).toBe(500);

    act(() => {
      fireResize('height', 1000);
      requestAnimationFrame.step();
    });
    expect(hook.result.current.height).toBe(1000);
  });
});
