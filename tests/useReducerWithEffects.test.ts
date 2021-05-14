import { useReducerWithEffects } from '../src/useReducerWithEffects'
import { renderHook, act } from "@testing-library/react-hooks";

describe('useReducerWithEffects', () => {
  it('should be defined', () => {
    expect(useReducerWithEffects).toBeDefined()
  })

  it('should return state and dispatch', () => {
    const hook = renderHook(() => useReducerWithEffects(() => { }, {}, {}))

    expect(hook.result.current.length).toBe(2)
    expect(typeof hook.result.current[0]).toBe('object')
    expect(typeof hook.result.current[1]).toBe('function')
  })

  it('Updates state and executes side effects', () => {
    function reducer(state, _) {
      return {
        state: { ...state, count: state.count + 1 },
        documentTitle: "Updated Title"
      }
    }

    let handlers = { documentTitle: (_, payload) => document.title = payload }

    const { result } = renderHook(() => useReducerWithEffects(reducer, handlers, { count: 0 }))

    expect(document.title).toBe('')

    act(() => {
      result.current[1]({})
    })

    expect(result.current[0].count).toBe(1)

    expect(document.title).toBe("Updated Title")
  })
})