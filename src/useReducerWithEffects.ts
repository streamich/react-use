import React from 'react'

export const useReducerWithEffects = (reducerWithEffects, handlers, initialState) => {
  const [{ state, ...effects }, setState] = React.useState({ state: initialState })
  const dispatch = React.useCallback(action => setState(({ state }) => ({ state, ...reducerWithEffects(state, action) })), [reducerWithEffects])
  React.useEffect(function () {
    if (Object.keys(effects).length === 0) return
    for (let [handlerKey, effect] of Object.entries(effects)) {
      let handler = handlers[handlerKey]
      if (!handler) throw new Error(`Unrecognised handler key ${handlerKey}`)

      handler(dispatch, effect)
    }
    setState(({ state }) => { return { state } });
  }, [handlers, dispatch, effects])

  return [state, dispatch]
}