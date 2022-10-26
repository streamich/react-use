import { renderHook } from '@testing-library/react-hooks';
import { usePromise } from '../src';

function promiseState<T>(p: Promise<T>) {
  const t = {};
  return Promise.race([p, t]).then(
    (v) => (v === t ? 'pending' : 'fulfilled'),
    () => 'rejected'
  );
}

describe('usePromise', () => {
  test('should resolve the promise when component is mounted', async () => {
    const mPromise = Promise.resolve(1);
    const { result } = renderHook(usePromise);
    const value = await result.current(mPromise);
    expect(value).toBe(1);
  });

  test('should reject the promise when component is mounted', () => {
    const mPromise = Promise.reject(new Error('fakeError'));
    const { result } = renderHook(usePromise);
    expect(result.current(mPromise)).rejects.toThrowError('fakeError');
  });

  test('should return promise with pending state if component is unmounted', async () => {
    const mPromise = Promise.resolve(1);
    const { result, unmount } = renderHook(usePromise);
    const promise = result.current(mPromise);
    unmount();
    const state = await promiseState(promise);
    expect(state).toBe('pending');
  });
});
