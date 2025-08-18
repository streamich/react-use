import { act, renderHook, render } from '@testing-library/react';
import React from 'react';
import createGlobalState from 'src/hooks/createGlobalState';

describe('useGlobalState', () => {
  it('should be defined', () => {
    expect(createGlobalState).toBeDefined();
  });

  it('both components should be updated', () => {
    const useGlobalValue = createGlobalState(0);
    const { result: result1 } = renderHook(() => useGlobalValue());
    const { result: result2 } = renderHook(() => useGlobalValue());
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);
    act(() => {
      result1.current[1](1);
    });
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it('allows setting state with function and previous value', () => {
    const useGlobalValue = createGlobalState(0);
    const { result: result1 } = renderHook(() => useGlobalValue());
    const { result: result2 } = renderHook(() => useGlobalValue());
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);
    act(() => {
      result1.current[1]((value) => value + 1);
    });
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it('allows setting state with function and no previous value', () => {
    const useGlobalValue = createGlobalState(0);
    const { result: result1 } = renderHook(() => useGlobalValue());
    const { result: result2 } = renderHook(() => useGlobalValue());
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);
    act(() => {
      result1.current[1](() => 1);
    });
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });

  it('initializes and updates with undefined', () => {
    const useGlobalValue = createGlobalState<number>();
    const { result: result1 } = renderHook(() => useGlobalValue());
    const { result: result2 } = renderHook(() => useGlobalValue());
    expect(result1.current[0]).toBe(undefined);
    expect(result2.current[0]).toBe(undefined);
    act(() => {
      // this is the only case where types fail, it should guard the number
      result1.current[1]((value) => value);
    });
    expect(result1.current[0]).toBe(undefined);
    expect(result2.current[0]).toBe(undefined);
  });

  it('initializes with undefined and updates with different type', () => {
    const useGlobalValue = createGlobalState();
    const { result: result1 } = renderHook(() => useGlobalValue());
    const { result: result2 } = renderHook(() => useGlobalValue());
    expect(result1.current[0]).toBe(undefined);
    expect(result2.current[0]).toBe(undefined);
    act(() => {
      // @ts-expect-error this case it checks correctly, hence the comment
      result1.current[1]((value) => 1);
    });
  });

  it('should set ref correctly', async () => {
    const useGlobalValue = createGlobalState<Element>();
    const CheckComponent = ({ stateValue1 }) => {
      const [stateValue2] = useGlobalValue();
      return <>{String(stateValue2 !== undefined && stateValue2 === stateValue1)}</>;
    };

    const WrapperComponent = () => {
      const [stateValue, setStateValue] = useGlobalValue();
      return <div ref={setStateValue}>
        <CheckComponent stateValue1={stateValue} />
      </div>;
    };
    const { findByText } = render(<WrapperComponent />);
    expect(await findByText('true')).toBeDefined();
  });

  it('initializes with function', () => {
    const useGlobalValue = createGlobalState(() => 0);
    const { result: result1 } = renderHook(() => useGlobalValue());
    const { result: result2 } = renderHook(() => useGlobalValue());
    expect(result1.current[0]).toBe(0);
    expect(result2.current[0]).toBe(0);
    act(() => {
      result1.current[1](1);
    });
    expect(result1.current[0]).toBe(1);
    expect(result2.current[0]).toBe(1);
  });
});
