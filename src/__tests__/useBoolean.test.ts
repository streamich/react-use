import useBoolean from '../useBoolean';
import useToggle from '../useToggle';

describe('useBoolean hook', () => {
  it('should be an alias for useToggle ', () => {
    expect(useBoolean).toBe(useToggle);
  });
});
