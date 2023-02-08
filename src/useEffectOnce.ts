import { EffectCallback, useEffect, useRef } from "react"

const useEffectOnce = (effect: EffectCallback) => {
  const runOnce = useRef(false)
  useEffect(() => {
    if (runOnce.current) return
    runOnce.current = true
    return effect()
  }, [])
}

export default useEffectOnce
