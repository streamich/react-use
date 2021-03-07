import { renderHook, act } from '@testing-library/react-hooks';
import useDownloader from '../src/useDownloader';

const expectedKeys = [
  'elapsed',
  'percentage',
  'size',
  'download',
  'cancel',
  'error',
  'isInProgress',
];

describe('useDownloader', () => {
  it('should be defined', () => {
    const { result } = renderHook(() => useDownloader());
    expect(result).toBeDefined();
  });

  it('should return initial values', () => {
    const { result } = renderHook(() => useDownloader());

    expectedKeys.forEach((key) => {
      expect(result.current.hasOwnProperty(key)).toBeTruthy();
    });
  });

  it('should start download', async () => {
    const { result } = renderHook(() => useDownloader());
    const { download, isInProgress } = result.current;

    const spy = jest.spyOn(result.current, 'download');
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          return setTimeout(() => resolve({} as Response), 1000);
        })
    );

    expect(isInProgress).toBeFalsy();

    act(() => {
      download('https://url.com', 'filename');
    });

    console.log('isInProgress', isInProgress);
    // expect(isInProgress).toBeTruthy();

    expect(spy).not.toHaveBeenCalled();
  });
});
