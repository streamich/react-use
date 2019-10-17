import { act, renderHook } from '@testing-library/react-hooks';
import useSearchParamInput from '../src/useSearchParamInput';
(global as any).window = Object.create(window);
const location = {
  pathname: 'https://www.my-site.com',
  search: 'foo=bar&baz=quux',
};
Object.defineProperty(window, 'location', {
  value: location,
});
Object.defineProperty(window, 'history', {
  value: {
    replaceState: jest.fn(),
  },
});

it('returns current location.search value', () => {
  location.search = 'foo=bar&baz=quux';

  const { result } = renderHook(() => useSearchParamInput('foo'));

  expect(result.current[0]).toBe('bar');
});

it('returns null if search param not found', () => {
  location.search = 'foo=bar&baz=quux';

  const { result } = renderHook(() => useSearchParamInput('foo2'));

  expect(result.current[0]).toBeNull();
});

it('updates location search when input is updated', () => {
  location.search = 'foo=bar&baz=quux';

  const { result } = renderHook(() => useSearchParamInput('foo'));

  act(() => {
    result.current[1]('baz');
  });
  expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'https://www.my-site.com?foo=baz&baz=quux');
});

it('calls onUpdate when input is updated', () => {
  location.search = 'foo=bar&baz=quux';
  const onUpdate = jest.fn();
  const { result } = renderHook(() => useSearchParamInput('foo', '', { onUpdate }));

  act(() => {
    result.current[1]('baz');
  });
  expect(onUpdate).toHaveBeenCalledWith('https://www.my-site.com?foo=baz&baz=quux');
});
