import { useRef, useEffect } from 'react'

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isInitialMount = useRef(true)

  useEffect(
    isInitialMount.current
      ? () => {
          isInitialMount.current = false
        }
      : effect,
    deps
  )
}

export default useUpdateEffect
