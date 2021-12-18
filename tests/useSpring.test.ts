import { act, renderHook } from '@testing-library/react-hooks';
import { Spring } from 'rebound';
import useSpring from '../src/useSpring';

// simulate Spring for testing
const mockSetCurrentValue = jest.fn();
const mockAddListener = jest.fn();
const mockSetEndValue = jest.fn();
const mockRemoveListener = jest.fn();
let triggerSpringUpdate = () => {};
let springListener: Listener = { onSpringUpdate: () => {} };

interface Listener {
  onSpringUpdate: (currentSpring: Spring) => void;
}

const mockCreateSpring: Spring = jest.fn().mockImplementation(() => {
  let currentValue = 0;
  let endValue = 0;

  const getCloserValue = (a, b) => Math.round((a + b) / 2);

  const getCurrentValue = () => {
    currentValue = getCloserValue(currentValue, endValue);
    return currentValue;
  };

  triggerSpringUpdate = () => {
    if (currentValue !== endValue) {
      springListener.onSpringUpdate({ getCurrentValue } as any);
    }
  };

  return {
    setCurrentValue: (val) => {
      currentValue = val;
      mockSetCurrentValue(val);
    },
    addListener: (newListener) => {
      springListener = newListener;
      mockAddListener(newListener);
    },
    setEndValue: (val) => {
      endValue = val;
      mockSetEndValue(val);
    },
    removeListener: mockRemoveListener,
  };
}) as any;

jest.mock('rebound', () => {
  return {
    Sprint: {},
    SpringSystem: jest.fn().mockImplementation(() => {
      return { createSpring: mockCreateSpring };
    }),
  };
});

it('should init value to provided target', () => {
  const { result } = renderHook(() => useSpring(70));

  expect(result.current).toBe(70);
  expect(mockSetCurrentValue).toHaveBeenCalledTimes(1);
  expect(mockSetCurrentValue).toHaveBeenCalledWith(70);
  expect(mockCreateSpring).toHaveBeenCalledTimes(1);
  expect(mockCreateSpring).toHaveBeenCalledWith(50, 3);
});

it('should create spring with custom tension and friction args provided', () => {
  renderHook(() => useSpring(500, 20, 7));

  expect(mockCreateSpring).toHaveBeenCalledTimes(1);
  expect(mockCreateSpring).toHaveBeenCalledWith(20, 7);
});

it('should subscribe only once', () => {
  const { rerender } = renderHook(() => useSpring());

  expect(mockAddListener).toHaveBeenCalledTimes(1);
  expect(mockAddListener).toHaveBeenCalledWith(springListener);

  rerender();

  expect(mockAddListener).toHaveBeenCalledTimes(1);
});

it('should handle spring update', () => {
  let targetValue = 70;
  let lastSpringValue = targetValue;
  const { result, rerender } = renderHook(() => useSpring(targetValue));

  targetValue = 100;
  rerender();
  expect(result.current).toBe(lastSpringValue);

  act(() => {
    triggerSpringUpdate(); // simulate new spring value
  });
  expect(result.current).toBeGreaterThan(lastSpringValue);
  expect(result.current).toBeLessThanOrEqual(targetValue);

  lastSpringValue = result.current;
  act(() => {
    triggerSpringUpdate(); // simulate another new spring value
  });
  expect(result.current).toBeGreaterThan(lastSpringValue);
  expect(result.current).toBeLessThanOrEqual(targetValue);
});

it('should remove listener on unmount', () => {
  const { unmount } = renderHook(() => useSpring());
  expect(mockRemoveListener).not.toHaveBeenCalled();

  unmount();

  expect(mockRemoveListener).toHaveBeenCalledTimes(1);
  expect(mockRemoveListener).toHaveBeenCalledWith(springListener);
});
