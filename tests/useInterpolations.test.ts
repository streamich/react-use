import { renderHook } from "@testing-library/react-hooks";
import * as useTween from "../src/useTween";
import useInterpolations from "../src/useInterpolations";

let spyUseTween;

beforeEach(() => {
  spyUseTween = jest.spyOn(useTween, "default").mockReturnValue(0.5);
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("should interpolate map values with default parameters", () => {
  const { result } = renderHook(() =>
    useInterpolations({
      left: [0, 100],
      top: [50, 150],
      opacity: [0, 1],
    })
  );

  expect(result.current.left).toBe(50);
  expect(result.current.top).toBe(100);
  expect(result.current.opacity).toBe(0.5);
  expect(spyUseTween).toHaveBeenCalledTimes(1);
  expect(spyUseTween).toHaveBeenCalledWith("inCirc", 200, 0);
});

it("should interpolate map values with custom parameters", () => {
  const { result } = renderHook(() =>
    useInterpolations(
      {
        x: [10, 20],
        y: [-5, 5],
      },
      "outCirc",
      500,
      100
    )
  );

  expect(result.current.x).toBe(15);
  expect(result.current.y).toBe(0);
  expect(spyUseTween).toHaveBeenCalledTimes(1);
  expect(spyUseTween).toHaveBeenCalledWith("outCirc", 500, 100);
});

it("should interpolate at t=0", () => {
  spyUseTween.mockReturnValue(0);

  const { result } = renderHook(() =>
    useInterpolations({
      left: [10, 90],
      top: [20, 80],
    })
  );

  expect(result.current.left).toBe(10);
  expect(result.current.top).toBe(20);
});

it("should interpolate at t=1", () => {
  spyUseTween.mockReturnValue(1);

  const { result } = renderHook(() =>
    useInterpolations({
      left: [10, 90],
      top: [20, 80],
    })
  );

  expect(result.current.left).toBe(90);
  expect(result.current.top).toBe(80);
});

describe("when invalid map is provided", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should log an error when map is not an object", () => {
    const { result } = renderHook(() =>
      useInterpolations(null as unknown as Record<string, readonly [number, number]>)
    );

    expect(result.current).toEqual({});
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      'useInterpolations() expected "map" to be an object.'
    );
  });

  it("should log an error when map value is not a tuple", () => {
    const { result } = renderHook(() =>
      useInterpolations({
        left: [10] as unknown as readonly [number, number],
      })
    );

    expect(result.current).toEqual({});
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('useInterpolations() expected map["left"] to be a [start, end] tuple')
    );
  });

  it("should log an error when map value contains non-numbers", () => {
    const { result } = renderHook(() =>
      useInterpolations({
        left: ["0", 100] as unknown as readonly [number, number],
      })
    );

    expect(result.current).toEqual({});
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('useInterpolations() expected map["left"] to contain numbers')
    );
  });

  it("should log an error when map value contains non-finite numbers", () => {
    const { result } = renderHook(() =>
      useInterpolations({
        left: [0, Infinity],
      })
    );

    expect(result.current).toEqual({});
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('useInterpolations() expected map["left"] to contain finite numbers')
    );
  });
});
