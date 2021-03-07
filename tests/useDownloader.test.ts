import { renderHook, act } from '@testing-library/react-hooks';
import { jsDownload } from '../src/useDownloader';
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

  it('should start download with no OK', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDownloader());

    global.window.fetch = jest.fn(() => Promise.resolve({ ok: false } as Response));

    const downloadSpy = jest.spyOn(result.current, 'download');

    expect(result.current.isInProgress).toBeFalsy();

    act(() => {
      result.current.download('https://url.com', 'filename');
    });

    expect(result.current.isInProgress).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.isInProgress).toBeFalsy();

    expect(downloadSpy).toHaveBeenCalled();
  });

  it('should NOT start download with isInProgress', async () => {
    process.env.REACT_APP_DEBUG_MODE = 'true';
    const { result, waitForNextUpdate } = renderHook(() => useDownloader());

    global.window.fetch = jest.fn(() => Promise.resolve({ ok: false } as Response));

    const downloadSpy = jest.spyOn(result.current, 'download');

    expect(result.current.isInProgress).toBeFalsy();

    act(() => {
      result.current.download('https://url.com', 'filename');
    });

    const isInProgressRef = result.current.isInProgress;

    expect(result.current.isInProgress).toBeTruthy();

    act(() => {
      result.current.download('https://url2.com', 'filename 2');
    });

    expect(result.current.isInProgress).toEqual(isInProgressRef);

    await waitForNextUpdate();

    expect(result.current.isInProgress).toBeFalsy();

    expect(downloadSpy).toHaveBeenCalled();
  });

  it('should start download with no body', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDownloader());

    global.window.fetch = jest.fn(() =>
      Promise.resolve(({ ok: true, body: undefined } as unknown) as Response)
    );

    act(() => {
      result.current.download('https://url.com', 'filename');
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual({
      errorMessage: 'ReadableStream not yet supported in this browser.',
    });
  });

  it('should start download with error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDownloader());

    global.window.fetch = jest.fn(() => Promise.reject(new Error('Custom error!')));

    expect(result.current.error).toBeNull();

    act(() => {
      result.current.download('https://url.com', 'filename');
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual({ errorMessage: 'Custom error!' });
  });

  it('should start download with error Failed to fetch', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDownloader());

    global.window.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')));

    expect(result.current.error).toBeNull();

    act(() => {
      result.current.download('https://url.com', 'filename');
    });

    await waitForNextUpdate();

    expect(result.current.error).toBeNull();
  });

  describe('Tests with msSaveBlob', () => {
    beforeAll(() => {
      (window as any).navigator.msSaveBlob = () => {
        return true;
      };
    });

    it('should test with msSaveBlob', () => {
      const msSaveBlobSpy = jest.spyOn(window.navigator, 'msSaveBlob');

      jsDownload(new Blob(['abcde']), 'test');

      expect(msSaveBlobSpy).toHaveBeenCalled();
    });
  });

  describe('Tests without msSaveBlob', () => {
    beforeAll(() => {
      (window as any).navigator.msSaveBlob = undefined;
      (window as any).URL = {
        createObjectURL: () => null,
        revokeObjectURL: () => null,
      };
    });

    it('should test with URL and being revoked', async () => {
      const createObjectURLSpy = jest.spyOn(window.URL, 'createObjectURL');
      const revokeObjectURLSpy = jest.spyOn(window.URL, 'revokeObjectURL');

      jsDownload(new Blob(['abcde']), 'test');

      expect(createObjectURLSpy).toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(() => resolve(true), 250));

      expect(revokeObjectURLSpy).toHaveBeenCalled();
    });

    it('should test with URL via webkitURL', () => {
      (window as any).URL = undefined;
      (window as any).webkitURL = {
        createObjectURL: () => null,
      };
      const createObjectWebkitURLSpy = jest.spyOn(window.webkitURL, 'createObjectURL');

      jsDownload(new Blob(['abcde']), 'test');

      expect(createObjectWebkitURLSpy).toHaveBeenCalled();
    });
  });
});
