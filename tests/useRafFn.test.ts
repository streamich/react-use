import { act, renderHook } from '@testing-library/react-hooks';
import { replaceRaf } from 'raf-stub';
import useRafFn from '../src/useRafFn';

/**
 * New requestAnimationFrame after being replaced with raf-stub for testing purposes.
 */
interface RequestAnimationFrame {
  reset(): void;

  step(): void;
}

declare var requestAnimationFrame: RequestAnimationFrame;

replaceRaf();
const fixedStart = 1564949709496;
const spyDateNow = jest.spyOn(Date, 'now').mockImplementation(() => fixedStart);

beforeEach(() => {
  jest.useFakeTimers();
  requestAnimationFrame.reset();
});

afterEach(() => {
  jest.clearAllTimers();
  requestAnimationFrame.reset();
});

it('should init percentage of time elapsed', () => {
  const { result } = renderHook(() => useRafFn());
  const [timeElapsed] = result.current;

  expect(timeElapsed).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);
});

it('should init no animation', () => {
  const { result } = renderHook(() => useRafFn());

  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);
  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);
});

it('should init percentage of time elapsed for execute play method', () => {
  const { result } = renderHook(() => useRafFn());

  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should return corresponding percentage of time elapsed for default ms', () => {
  const { result } = renderHook(() => useRafFn());

  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.25); // 25%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.25);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.75); // 75%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.75);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should return corresponding percentage of time elapsed for custom ms', () => {
  const customMs = 2000;
  const { result } = renderHook(() => useRafFn(customMs));

  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);
  
  act(() => {
    result.current[1].play();
    spyDateNow.mockImplementationOnce(() => fixedStart + customMs * 0.25); // 25%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.25);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + customMs * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + customMs * 0.75); // 75%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.75);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + customMs); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should automatically run animation for set autoplay to true', () => {
  const { result } = renderHook(() => useRafFn(1e3, true));
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should return always 1 after corresponding ms reached', () => {
  const { result } = renderHook(() => useRafFn());
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 1.1); // 110%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 3); // 300%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should clear pending timers on unmount', () => {
  const spyRafStop = jest.spyOn(global, 'cancelAnimationFrame' as any);
  const { unmount } = renderHook(() => useRafFn());

  expect(spyRafStop).not.toHaveBeenCalled();

  unmount();

  expect(spyRafStop).toHaveBeenCalledTimes(0);
});

it('should stop animation for execute pause method', () => {
  const { result } = renderHook(() => useRafFn());
  const [elapsed, { play, paused, completed }] = result.current;

  expect(elapsed).toBe(0);
  expect(paused).toBe(true);
  expect(completed).toBe(false);

  act(() => {
    play()
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.25); // 25%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.25);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].pause();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.75); // 75%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 3); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);
});

it('should start or continue animation when play is in paused status', () => {
  const { result } = renderHook(() => useRafFn());
  const [elapsed, { play, paused, completed }] = result.current;
  let tmpNum = 0

  expect(elapsed).toBe(0);
  expect(paused).toBe(true);
  expect(completed).toBe(false);

  act(() => {
    play()
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.25); // 25%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.25);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].pause();
    tmpNum = 1e3 * 0.25;
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.25);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.75); // 75%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.25);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0 + tmpNum); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.25 + tmpNum); // 125%
    requestAnimationFrame.step();
    tmpNum = 0;
  });
  expect(result.current[0]).toBe(0.75);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);
});

it('should restart animation when restart is in playing status', () => {
  const { result } = renderHook(() => useRafFn());
  const [elapsed, { play, paused, completed }] = result.current;

  expect(elapsed).toBe(0);
  expect(paused).toBe(true);
  expect(completed).toBe(false);

  act(() => {
    play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].restart();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5 ); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 1); // 150%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should restart animation when restart is in paused status ', () => {
  const { result } = renderHook(() => useRafFn());
  const [elapsed, { play, paused, completed }] = result.current;

  expect(elapsed).toBe(0);
  expect(paused).toBe(true);
  expect(completed).toBe(false);

  act(() => {
    play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].pause();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].restart();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0 );
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 1);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should restart animation when play is in after corresponding ms reached', () => {
  const { result } = renderHook(() => useRafFn());
  const [elapsed, { play, paused, completed }] = result.current;

  expect(elapsed).toBe(0);
  expect(paused).toBe(true);
  expect(completed).toBe(false);

  act(() => {
    play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);

  act(() => {
    result.current[1].play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5); // 50%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 1 ); // 100%
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should be able to pause animation for set autoplay to true', () => {
  const { result } = renderHook(() => useRafFn(1e3, true));
  const [elapsed, { paused, completed}] = result.current;
  expect(elapsed).toBe(0);
  expect(paused).toBe(false);
  expect(completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].pause()
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);
});

it('should be able to pause animation for after restart animation', () => {
  const { result } = renderHook(() => useRafFn());
  const [elapsed, { play, paused, completed }] = result.current;

  expect(elapsed).toBe(0);
  expect(paused).toBe(true);
  expect(completed).toBe(false);

  act(() => {
    play();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].restart();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0 );
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].pause();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 1);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);
});

it('should be back to the original position for execute stop', () => {
  const { result } = renderHook(() => useRafFn(1e3, true));
  const [elapsed, { paused, completed }] = result.current;

  expect(elapsed).toBe(0);
  expect(paused).toBe(false);
  expect(completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].stop();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);
});

it('should be jump to the specified position for execute seek', () => {
  const { result } = renderHook(() => useRafFn(1e3, true));
  const [elapsed, { paused, completed }] = result.current;

  expect(elapsed).toBe(0);
  expect(paused).toBe(false);
  expect(completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].seek(0.3);
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.3);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  // Minimum of 0
  act(() => {
    result.current[1].seek(-3);
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 1.1);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(false);

  // Maximum of 1
  act(() => {
    result.current[1].seek(5);
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 1.3);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(1);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should reverse run animate for execute reverse', () => {
  const { result } = renderHook(() => useRafFn(1e3, true));
  const [elapsed, { paused, completed }] = result.current;

  expect(elapsed).toBe(0);
  expect(paused).toBe(false);
  expect(completed).toBe(false);

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0.5);
  expect(result.current[1].paused).toBe(false);
  expect(result.current[1].completed).toBe(false);

  act(() => {
    result.current[1].reverse();
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3);
    requestAnimationFrame.step();
  });
  expect(result.current[0]).toBe(0);
  expect(result.current[1].paused).toBe(true);
  expect(result.current[1].completed).toBe(true);
});

it('should triggered the callback function for the animation is complete', () => {
  const effect = jest.fn();
  const { result } = renderHook(() => useRafFn(1e3, true));
  const { rerender } = renderHook(() => result.current[1].useOnComplete(effect))
  
  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3 * 0.5);
    requestAnimationFrame.step();
  });
  rerender();
  expect(effect).not.toHaveBeenCalled();

  act(() => {
    spyDateNow.mockImplementationOnce(() => fixedStart + 1e3);
    requestAnimationFrame.step();
  });
  rerender();
  expect(effect).toHaveBeenCalledTimes(1);
});