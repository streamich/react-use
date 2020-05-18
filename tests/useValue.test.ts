import { renderHook } from '@testing-library/react-hooks';
import useValue from '../src/useValue';

describe('useValue', () => {
  it('should wrap taken value to ref', () => {
    const { result, rerender } = renderHook((props) => useValue(props), {
      initialProps: 1
    });
    const initialResult = result.current;

    expect(result.current.current).toBe(1);

    rerender(2);

    expect(result.current.current).toBe(2);
    expect(result.current).toBe(initialResult);
  });
});
