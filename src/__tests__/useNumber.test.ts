import useNumber from '../useNumber';
import useCounter from '../useCounter';

describe('useNumber hook', () => {
  it('should be an alias for useCounter', () => {
    expect(useNumber).toBe(useCounter);
  });
});
