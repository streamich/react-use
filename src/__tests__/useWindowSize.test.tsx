import useWindowSize from "../useWindowSize"
import { renderHook, cleanup, act } from 'react-hooks-testing-library'

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

afterEach(cleanup)

describe("useWindowSize", () => {

  it("should be defined", () => {
    expect(useWindowSize).toBeDefined();
  });

  const hook = renderHook(() => useWindowSize())

  it("should update width", () => {
    act(()=>{
      fireResize('width', 320)
      hook.rerender()
    })
    expect(hook.result.current.width).toBe(320)
    act(()=>{
      fireResize('width', 640)
      hook.rerender()
    })
    expect(hook.result.current.width).toBe(640)
  });

  it("should update height", () => {
    act(()=>{
      fireResize('height', 500)
      hook.rerender()
    })
    expect(hook.result.current.height).toBe(500)
    act(()=>{
      fireResize('height', 1000)
      hook.rerender()
    })
    expect(hook.result.current.height).toBe(1000)
  });

});