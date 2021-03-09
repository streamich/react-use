import { act, renderHook } from '@testing-library/react-hooks';
import useSearchParam from '../src/useSearchParam';

const { location } = window;

let mockSearch: string;

beforeEach(() => {
  delete (window as any).location;
  const { search, ...restLocation } = location;

  // @ts-ignore
  window.location = { ...restLocation };

  Object.defineProperty(window.location, 'search', {
    get: function () {
      return mockSearch;
    },
  });
});

it('returns current location.search value', () => {
  mockSearch = 'foo=bar&baz=quux';

  const { result } = renderHook(() => useSearchParam('foo'));

  expect(result.current).toBe('bar');
});

it('returns null if search param not found', () => {
  mockSearch = 'foo=bar&baz=quux';

  const { result } = renderHook(() => useSearchParam('foo2'));

  expect(result.current).toBe(null);
});

it('tracks the latest search param value', () => {
  mockSearch = 'foo=bar&baz=quux';

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
    mockSearch = 'foo=1&baz=2';
    callback();
  });

  expect(result.current).toBe('2');

  window.addEventListener = window$addEventListener;
});
