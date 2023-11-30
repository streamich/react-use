import { renderHook } from "@testing-library/react-hooks";
import { useDevicePixelRatio } from "../src";

beforeEach(() => {
  Object.defineProperty(window, "devicePixelRatio", { value: 1, writable: true });
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: MediaQueryList) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
});

describe("testing initial value and update according to screen zoom", () => {
  test("initial value should be window.devicePixelRatio", () => {
    const { result } = renderHook(() => useDevicePixelRatio());

    expect(result.current.ratio).toBe(window.devicePixelRatio);
  });
  test("testing ratio value after zooming in", async () => {
    const { result,  } = renderHook(() => useDevicePixelRatio());
    Object.defineProperty(window, "devicePixelRatio", { value: 1.25, writable: true });
    setTimeout(() => {
        expect(result.current.ratio).toBe(window.devicePixelRatio);
    }, 1000);
  });
  test("testing ratio value after zooming out1", async () => {
    const { result,  } = renderHook(() => useDevicePixelRatio());
    Object.defineProperty(window, "devicePixelRatio", { value: 0.5, writable: true });
    setTimeout(() => {
        expect(result.current.ratio).toBe(window.devicePixelRatio);
    }, 1000);
    
  });
});
