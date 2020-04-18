import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import createGlobalEventBus from '../src/createGlobalEventBus';

describe('createGlobalEventBus', () => {
  it('should be defined', () => {
    expect(createGlobalEventBus).toBeDefined();
  });

  it('all components should receive events', () => {
    const useEventBus = createGlobalEventBus();

    const h1 = renderHook(() => {
      const [value, set_value] = useState(0);
      useEventBus((e) => set_value(e));
      return { value };
    });

    expect(h1.result.current.value).toBe(0);

    const h2 = renderHook(() => {
      const [value, set_value] = useState(4);
      const emit = useEventBus((e) => set_value(e));
      return { value, emit };
    });

    expect(h2.result.current.value).toBe(4);

    act(() => {
      h2.result.current.emit(7);
    });

    expect(h1.result.current.value).toBe(7);
    expect(h2.result.current.value).toBe(7);
  });
});
