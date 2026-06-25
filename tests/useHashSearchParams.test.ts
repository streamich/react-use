import { renderHook, act } from '@testing-library/react-hooks';
import { useHashSearchParams } from '../src/useHashSearchParams';

(global as any).window = Object.create(window);
let mockHash = '#';
const mockLocation = {};
Object.defineProperty(mockLocation, 'hash', {
  get() {
    return mockHash;
  },
  set(newHash) {
    mockHash = newHash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  },
});
Object.defineProperty(window, 'location', {
  value: mockLocation,
});

beforeEach(() => {
  window.location.hash = '#/path/to/page?id=1&name=jim';
});

test('Get specified search params in URL hash', () => {
  const { result } = renderHook(() => useHashSearchParams('name'));
  const [name] = result.current;
  expect(name).toEqual("jim")
});

test('Set specified search param in URL hash', () => {
  const { result } = renderHook(() => useHashSearchParams('name'));
  const [name, setName] = result.current
  expect(name).toBe('jim');

  act(() => {
    setName('jack');
  });
  const [name2] = result.current
  expect(name2).toBe('jack');
});


test('returns all search params in URL hash', () => {
  const { result } = renderHook(() => useHashSearchParams());
  const [searchParams] = result.current;
  expect(searchParams).toEqual({id: "1", name: "jim"})
});

test('Set all search params in URL hash', () => {
  const { result } = renderHook(() => useHashSearchParams());
  const [searchParams, setSearchParams] = result.current
  expect(searchParams).toEqual({id: "1", name: "jim"})

  act(() => {
    setSearchParams({id: "2", name: "jack"});
  });
  const [searchParams2] = result.current
  expect(searchParams2).toEqual({id: "2", name: "jack"})
});
