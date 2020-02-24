import useDebounceFn from '../src/useDebounceFn';
import useTimeoutFn from '../src/useTimeoutFn';

it('should be an alias for useTimeoutFn ', () => {
  expect(useDebounceFn).toBe(useTimeoutFn);
});
