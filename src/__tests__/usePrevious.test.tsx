import { cleanup, renderHook } from 'react-hooks-testing-library';
import usePrevious from '../usePrevious';

afterEach(cleanup);

describe('usePrevious', () => {
  it('should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  const hook = renderHook(props => usePrevious(props), { initialProps: 0 });

  it('should return undefined on initial render', () => {
    expect(hook.result.current).toBe(undefined);
  });

  it('should return previous state after update', () => {
    hook.rerender(1);
    hook.rerender(2);
    expect(hook.result.current).toBe(1);
  });
});
