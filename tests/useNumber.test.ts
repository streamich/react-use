import useCounter from '../src/useCounter';
import useNumber from '../src/useNumber';

it('should be an alias for useCounter', () => {
  expect(useNumber).toBe(useCounter);
});
