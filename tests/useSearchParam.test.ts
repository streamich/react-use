import { act, renderHook } from '@testing-library/react-hooks';
import useSearchParam from '../src/useSearchParam';

(global as any).window = Object.create(window);
const location = {
  search: 'foo=bar&baz=quux',
};
Object.defineProperty(window, 'location', {
  value: location,
});

it('returns current location.search value', () => {
  location.search = 'foo=bar&baz=quux';

  const { result } = renderHook(() => useSearchParam('foo'));

  expect(result.current).toBe('bar');
});

it('returns null if search param not found', () => {
  location.search = 'foo=bar&baz=quux';

  const { result } = renderHook(() => useSearchParam('foo2'));

  expect(result.current).toBe(null);
});

it('tracks the latest search param value', () => {
  location.search = 'foo=bar&baz=quux';

  let callback;
  const window$addEventListener = window.addEventListener;
  window.addEventListener = (event, cb) => {
    if (event === 'pushstate') {
      callback = cb;
    }
  };

  const { result } = renderHook(() => useSearchParam('baz'));

  expect(result.current).toBe('quux');

  act(() => {
    location.search = 'foo=1&baz=2';
    callback();
  });

  expect(result.current).toBe('2');

  window.addEventListener = window$addEventListener;
});
