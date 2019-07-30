import useNumber from '../useNumber';
import useCounter from '../useCounter';

it('should be an alias for useCounter', () => {
  expect(useNumber).toBe(useCounter);
});
