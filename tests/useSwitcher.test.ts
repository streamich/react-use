import { act, renderHook } from '@testing-library/react-hooks';
import { useSwitcher } from '../src/useSwitcher';

const setUp = (initialValue?: boolean) => renderHook(() => useSwitcher(initialValue));

describe(`useSwitcher`, () => {
  it('initial truthy state', () => {
    const { result } = setUp(true);
    expect(result.current.isSwitchedOn).toBe(true);
  });

  it('initial falsy state', () => {
    const { result } = setUp();
    expect(result.current.isSwitchedOn).toBe(false);
  });

  it('switch on', () => {
    const { result } = setUp();
    expect(result.current.isSwitchedOn).toBe(false);

    act(() => {
      result.current.switchOn();
    });

    expect(result.current.isSwitchedOn).toBe(true);
  });

  it('switch off', () => {
    const { result } = setUp(true);
    expect(result.current.isSwitchedOn).toBe(true);

    act(() => {
      result.current.switchOff();
    });

    expect(result.current.isSwitchedOn).toBe(false);
  });

  it('toggle', () => {
    const { result } = setUp(true);
    expect(result.current.isSwitchedOn).toBe(true);

    act(() => {
      result.current.toggleSwitcher();
    });

    expect(result.current.isSwitchedOn).toBe(false);
  });
});
