import { act, renderHook } from '@testing-library/react-hooks';
import useAllSearchParam from '../src/useAllSearchParam';

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

it('returns all search params as an object', () => {
  mockSearch = 'foo=bar&baz=quux';

  const { result } = renderHook(() => useAllSearchParam());

  expect(result.current).toEqual({ foo: 'bar', baz: 'quux' });
});

it('returns an empty object when there are no search params', () => {
  mockSearch = '';

  const { result } = renderHook(() => useAllSearchParam());

  expect(result.current).toEqual({});
});

it('tracks the latest search params', () => {
  mockSearch = 'foo=bar&baz=quux';

  let callback;
  const window$addEventListener = window.addEventListener;
  window.addEventListener = (event, cb) => {
    if (event === 'pushstate') {
      callback = cb;
    }
  };

  const { result } = renderHook(() => useAllSearchParam());

  expect(result.current).toEqual({ foo: 'bar', baz: 'quux' });

  act(() => {
    mockSearch = 'foo=1&baz=2';
    callback();
  });

  expect(result.current).toEqual({ foo: '1', baz: '2' });

  window.addEventListener = window$addEventListener;
});

it('keeps the first value for duplicate keys', () => {
  mockSearch = 'foo=bar&foo=baz';

  const { result } = renderHook(() => useAllSearchParam());

  expect(result.current).toEqual({ foo: 'bar' });
});
