import { act, renderHook } from '@testing-library/react-hooks';
import { use01 } from '../src';

const setUp = (initialValue?: 0 | 1) => renderHook(() => use01(initialValue));

describe('use01', () => {
  it('should be defined', () => {
    expect(use01).toBeDefined();
  });

  it('should init state to 0', () => {
    const { result } = setUp();
    expect(result.current[0]).toBe(0);
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
  });

  it('should init state to 1', () => {
    const { result } = setUp(1);
    expect(result.current[0]).toBe(1);
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
  });

  it('should toggle state from 1 to 0', () => {
    const { result } = setUp(1);

    const toggle = result.current[1];
    expect(result.current[0]).toBe(1);

    act(toggle);
    expect(result.current[0]).toBe(0);
  });

  it('should toggle state from 0 to 1', () => {
    const { result } = setUp();

    const toggle = result.current[1];
    expect(result.current[0]).toBe(0);

    act(toggle);
    expect(result.current[0]).toBe(1);
  });

  it('should set state to 0', () => {
    const { result } = setUp(1);
    const setV = result.current[2];

    expect(result.current[0]).toBe(1);

    act(() => {
      setV(0);
    });

    expect(result.current[0]).toBe(0);
  });

  it('should set state to 1', () => {
    const { result } = setUp();
    const setV = result.current[2];

    expect(result.current[0]).toBe(0);

    act(() => {
      setV(1);
    });

    expect(result.current[0]).toBe(1);
  });
});
