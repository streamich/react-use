import { renderHook } from '@testing-library/react-hooks';
import { easing } from 'ts-easing';
import * as useRaf from '../src/useRaf';
import useTween from '../src/useTween';

let spyUseRaf;
let spyEasingInCirc;
let spyEasingOutCirc;

beforeEach(() => {
  spyUseRaf = jest.spyOn(useRaf, 'default').mockReturnValue(17);
  spyEasingInCirc = jest.spyOn(easing, 'inCirc').mockReturnValue(999999);
  spyEasingOutCirc = jest.spyOn(easing, 'outCirc').mockReturnValue(101010);
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('should init corresponding utils with default values', () => {
  const { result } = renderHook(() => useTween());

  expect(result.current).toBe(999999);
  expect(spyEasingInCirc).toHaveBeenCalledTimes(1);
  expect(spyEasingInCirc).toHaveBeenCalledWith(17);
  expect(spyUseRaf).toHaveBeenCalledTimes(1);
  expect(spyUseRaf).toHaveBeenCalledWith(200, 0);
});

it('should init corresponding utils with custom values', () => {
  const { result } = renderHook(() => useTween('outCirc', 500, 15));

  expect(result.current).toBe(101010);
  expect(spyEasingOutCirc).toHaveBeenCalledTimes(1);
  expect(spyEasingOutCirc).toHaveBeenCalledWith(17);
  expect(spyUseRaf).toHaveBeenCalledTimes(1);
  expect(spyUseRaf).toHaveBeenCalledWith(500, 15);
});

describe('when invalid easing name is provided', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'trace').mockImplementation(() => {});
  });

  it('should log an error', () => {
    const { result } = renderHook(() => useTween('grijanderl'));

    expect(result.current).toBe(0);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'useTween() expected "easingName" property to be a valid easing function name'
      )
    );
    expect(console.trace).toHaveBeenCalledTimes(1);
  });
});
