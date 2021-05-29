import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";
import useHoverDirty from "../src/useHoverDirty";
import { act } from "@testing-library/react-hooks";

describe("use hover dirty", () => {
  const Ref = createRef<HTMLInputElement>();
  render(<div ref={Ref} data-testid="hoverOnMe" />);
  const div = screen.getByTestId("hoverOnMe");
  const { result, rerender } = renderHook(({ ref, enable }) => useHoverDirty(ref, enable), {
    initialProps: { ref: Ref, enable: true },
  });

  test("should return true on hover and false on hover out", () => {
    act(() => {
      userEvent.hover(div);
    });
    expect(result.current).toBe(true);
    act(() => {
      userEvent.unhover(div);
    });
    expect(result.current).toBe(false);
  });

  test("should return false when the enable argument is false", () => {
    rerender({ ref: Ref, enable: false });
    act(() => {
      userEvent.hover(div);
    });
    expect(result.current).toBe(false);
    act(() => {
      userEvent.unhover(div);
    });
    expect(result.current).toBe(false);
  });
});
