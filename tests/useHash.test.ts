import { renderHook, act } from '@testing-library/react-hooks';
import { useHash } from '../src/useHash';

(global as any).window = Object.create(window);
let mockHashHistory = ['#'];
const mockLocation = {
  pathname: 'foo/bar',
  search: '?x=0&y=1',
  replace: (url: string) => {
    mockHashHistory.pop();
    window.location.hash = url.substr(url.indexOf('#'));
  }
};
Object.defineProperty(mockLocation, 'hash', {
  get() {
    return mockHashHistory.slice(-1)[0];
  },
  set(newHash) {
    mockHashHistory.push(newHash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  },
});
Object.defineProperty(window, 'location', {
  value: mockLocation,
});

beforeEach(() => {
  mockHashHistory = ['#'];
});

test('returns current url hash', () => {
  window.location.hash = '#abc';
  expect(mockHashHistory).toEqual(['#', '#abc']);

  const { result } = renderHook(() => useHash());

  const hash = result.current[0];
  expect(hash).toBe('#abc');
});

test('returns latest url hash when change the hash with setHash', () => {
  const { result } = renderHook(() => useHash());
  const hash = result.current[0];
  const setHash = result.current[1];
  expect(hash).toBe('#');
  act(() => {
    setHash('#abc');
  });
  expect(mockHashHistory).toEqual(['#', '#abc']);
  const hash2 = result.current[0];
  expect(hash2).toBe('#abc');
});

test('avoids setting the same hash', () => {
  window.location.hash = '#abc';
  expect(mockHashHistory).toEqual(['#', '#abc']);

  const { result } = renderHook(() => useHash());
  const setHash = result.current[1];

  expect(mockHashHistory).toEqual(['#', '#abc']);
  act(() => {
    setHash('#abc');
  });
  expect(mockHashHistory).toEqual(['#', '#abc']);

  act(() => {
    setHash('abc'); // leading # sign is optional
  });
  expect(mockHashHistory).toEqual(['#', '#abc']);
});

test('returns latest url hash when replace the hash with setHash', () => {
  const { result } = renderHook(() => useHash());
  const hash = result.current[0];
  const setHash = result.current[1];
  expect(hash).toBe('#');
  act(() => {
    setHash('#abc', true);
  });
  expect(mockHashHistory).toEqual(['#abc']);
  const hash2 = result.current[0];
  expect(hash2).toBe('#abc');
});

it('returns latest url hash when change the hash with "hashchange" event', () => {
  const {result} = renderHook(() => useHash());
  const hash = result.current[0]
  expect(hash).toBe('#');
  act(() => {
    window.location.hash = '#abc'
  })
  expect(mockHashHistory).toEqual(['#', '#abc']);
  const hash2 = result.current[0]
  expect(hash2).toBe('#abc');
});
