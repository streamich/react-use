import { act, cleanup, renderHook } from 'react-hooks-testing-library';
import useToggle from '../useToggle';

afterEach(cleanup);

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  const hook = renderHook(props => useToggle(props), { initialProps: false });

  it('should return initial state on initial render', () => {
    expect(hook.result.current[0]).toBe(false);
  });

  it('should update state with correct value', () => {
    hook.rerender(true);
    expect(hook.result.current[0]).toBe(true);

    act(() => {
      hook.result.current[1](false);
    });

    expect(hook.result.current[0]).toBe(false);
  });

  // it('should toggle state without a value parameter', () => {
  //   act(() => {
  //     hook.result.current[1]();
  //   });

  //   expect(hook.result.current[0]).toBe(true);
  // });

  // it('should ignore non-boolean parameters', () => {
  //   act(() => {
  //     hook.result.current[1]('string');
  //   });

  //   expect(hook.result.current[0]).toBe(true);

  //   act(() => {
  //     hook.result.current[1]({});
  //   });

  //   expect(hook.result.current[0]).toBe(false);
  // });
});
