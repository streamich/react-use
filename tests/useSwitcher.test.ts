import { act, renderHook } from '@testing-library/react-hooks';
import useSwitcher from '../src/useSwitcher';

const setUp = (initialValue?: boolean) => renderHook(() => useSwitcher(initialValue));

describe('useSwitcher', () => {
  it('should init state to false by default', () => {
    const { result } = setUp();

    expect(result.current[0]).toBe(false);
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
    expect(typeof result.current[3]).toBe('function');
  });

  it('should init state to false when explicitly passed', () => {
    const { result } = setUp(false);

    expect(result.current[0]).toBe(false);
  });

  it('should init state to true when passed', () => {
    const { result } = setUp(true);

    expect(result.current[0]).toBe(true);
  });

  it('should turn on from false', () => {
    const { result } = setUp(false);
    const [, turnOn] = result.current;

    expect(result.current[0]).toBe(false);

    act(() => {
      turnOn();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should stay on when turn on is called while already on', () => {
    const { result } = setUp(true);
    const [, turnOn] = result.current;

    expect(result.current[0]).toBe(true);

    act(() => {
      turnOn();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should turn off from true', () => {
    const { result } = setUp(true);
    const [, , turnOff] = result.current;

    expect(result.current[0]).toBe(true);

    act(() => {
      turnOff();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should stay off when turn off is called while already off', () => {
    const { result } = setUp(false);
    const [, , turnOff] = result.current;

    expect(result.current[0]).toBe(false);

    act(() => {
      turnOff();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should toggle state from true to false', () => {
    const { result } = setUp(true);
    const [, , , toggle] = result.current;

    act(() => {
      toggle();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should toggle state from false to true', () => {
    const { result } = setUp(false);
    const [, , , toggle] = result.current;

    act(() => {
      toggle();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should toggle multiple times correctly', () => {
    const { result } = setUp(false);
    const [, , , toggle] = result.current;

    expect(result.current[0]).toBe(false);

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(true);
  });

  it('should work with all functions in combination', () => {
    const { result } = setUp(false);
    const [, turnOn, turnOff, toggle] = result.current;

    expect(result.current[0]).toBe(false);

    act(() => {
      turnOn();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      turnOn();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      turnOff();
    });
    expect(result.current[0]).toBe(false);
  });

  it('should maintain function references across re-renders', () => {
    const { result, rerender } = setUp(false);
    
    const [, turnOn1, turnOff1, toggle1] = result.current;

    rerender();

    const [, turnOn2, turnOff2, toggle2] = result.current;

    expect(turnOn1).toBe(turnOn2);
    expect(turnOff1).toBe(turnOff2);
    expect(toggle1).toBe(toggle2);
  });
});
