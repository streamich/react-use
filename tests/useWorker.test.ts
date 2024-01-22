import { renderHook } from '@testing-library/react-hooks';
import { useWorker } from '../src';

describe('useWorker', () => {
  const url = URL.createObjectURL(new Blob(['onmessage = e => { postMessage(e.data); };']));
  afterAll(() => {
    URL.revokeObjectURL(url);
  });

  it('should return isLoading as true initially', () => {
    const mockWorker = new Worker(url);
    const { result } = renderHook(() => useWorker(mockWorker));
    expect(result.current.instance).toBe(mockWorker);

    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(true);

    setTimeout(() => {
      mockWorker.dispatchEvent(new MessageEvent('message', { data: { message: 'hello' } }));
      expect(result.current.data).toEqual({ message: 'hello' });
      expect(result.current.isLoading).toBe(false);
    }, 100);

    setTimeout(() => {
      mockWorker.dispatchEvent(new ErrorEvent('error', { error: new Error('oops') }));
      expect(result.current.error?.message).toBe('oops');
      expect(result.current.isLoading).toBe(false);
    }, 100);
  });
});
