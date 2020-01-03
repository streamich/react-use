import useBoolean from '../src/useBoolean';
import useToggle from '../src/useToggle';

it('should be an alias for useToggle ', () => {
  expect(useBoolean).toBe(useToggle);
});
