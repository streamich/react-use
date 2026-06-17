import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';
import useFullscreen from '../src/useFullscreen';

// Mock screenfull
const mockScreenfull = {
  isEnabled: true,
  isFullscreen: false,
  request: jest.fn(),
  exit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

jest.mock('screenfull', () => mockScreenfull);

// Mock the on/off functions from misc/util
jest.mock('../src/misc/util', () => ({
  noop: () => {},
  on: jest.fn(),
  off: jest.fn(),
}));

describe('useFullscreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockScreenfull.isEnabled = true;
    mockScreenfull.isFullscreen = false;
  });

  it('should be defined', () => {
    expect(useFullscreen).toBeDefined();
  });

  it('should return false when disabled', () => {
    const ref = createRef<HTMLDivElement>();
    const { result } = renderHook(() => useFullscreen(ref, false));

    expect(result.current).toBe(false);
  });

  it('should return a boolean value', () => {
    const ref = createRef<HTMLDivElement>();
    const { result } = renderHook(() => useFullscreen(ref, true));

    expect(typeof result.current).toBe('boolean');
  });

  it('should accept options parameter', () => {
    const ref = createRef<HTMLDivElement>();
    const options = { onClose: jest.fn() };
    const { result } = renderHook(() => useFullscreen(ref, true, options));

    expect(typeof result.current).toBe('boolean');
  });
});
