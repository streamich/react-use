import useCounter from '../useCounter';
import useNumber from '../useNumber';

it('should be an alias for useCounter', () => {
  expect(useNumber).toBe(useCounter);
});
