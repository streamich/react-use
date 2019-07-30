import useBoolean from '../useBoolean';
import useToggle from '../useToggle';

it('should be an alias for useToggle ', () => {
  expect(useBoolean).toBe(useToggle);
});
