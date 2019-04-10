import * as React from "react";
import useWindowSize from "../../useWindowSize"
import WindowComponent from './container'
import { render, getByTestId } from 'react-testing-library'
import { act } from 'react-dom/test-utils'; 

// simulate window resize 
function fireResize(type, value) {
  switch (type) {
    case 'width':
      (window.innerWidth as number) = value // assert type of window.innerWidth as it is typed as readonly.
      break;
    case 'height':
      (window.innerHeight as number) = value // assert type of window.innerHeight as it is typed as readonly.
    break;
    default:
      break;
  }
  window.dispatchEvent(new Event('resize'))
}

describe("useWindowSize", () => {
  it("should be defined", () => {
    expect(useWindowSize).toBeDefined();
  });

  const { container, rerender } = render(<WindowComponent />)
  const width = getByTestId(container, "width");
  const height = getByTestId(container, "height");

  it("should update width", () => {
    act(() => {
      fireResize('width', 320)
      rerender(<WindowComponent />) 
    })
    expect(width.textContent).toBe('320')
    act(() => {
      fireResize('width', 640)
      rerender(<WindowComponent />) 
    })
    expect(width.textContent).toBe('640')
  });

  it("should update height", () => {
    act(() => {
      fireResize('height', 500)
      rerender(<WindowComponent />) 
    })
    expect(height.textContent).toBe('500')
    act(() => {
      fireResize('height', 1000)
      rerender(<WindowComponent />) 
    })
    expect(height.textContent).toBe('1000')
  });
});