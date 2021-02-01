import { renderHook, act } from '@testing-library/react-hooks';
import { useHash } from '../src/useHash';

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
  window.location.hash = '#';
});

test('returns current url hash', () => {
  window.location.hash = '#abc';

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
  const hash2 = result.current[0];
  expect(hash2).toBe('#abc');
});

it('returns latest url hash when change the hash with "hashchange" event', () => {
  const { result } = renderHook(() => useHash());
  const hash = result.current[0];
  expect(hash).toBe('#');
  act(() => {
    window.location.hash = '#abc';
  });
  const hash2 = result.current[0];
  expect(hash2).toBe('#abc');
});
