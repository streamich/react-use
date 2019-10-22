import { useEffect, useState } from 'react'

function useBreakpoint(breakpoints: { [name: string]: number } = { laptopL: 1440, laptop: 1024, tablet: 768 }) {
      const [useScreen, setScreen] = useState(0)

      useEffect(() => {
            const setSideScreen = (): void => {
                  setScreen(window.innerWidth)
            }
            setSideScreen()
            window.addEventListener('resize', setSideScreen)
            return () => {
                  window.removeEventListener('resize', setSideScreen)
            }
      })
      const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => a[1] >= b[1] ? 1 : -1)
      const result = sortedBreakpoints.reduce((acc, [name, width]) => {
            if (useScreen >= width) return name
            else return acc
      }, sortedBreakpoints[0][0])
      return result
}

export default useBreakpoint
