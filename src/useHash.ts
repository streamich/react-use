import { useState, useCallback } from "react"
import useLifecycles from "./useLifecycles"

/**
 * read and write url hash, response to url hash change
 */
export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash)

  const onHashChange = useCallback(() => {
    setHash(window.location.hash)
  }, [])

  useLifecycles(() => {
    window.addEventListener('hashchange', onHashChange)
  }, () => {
    window.removeEventListener('hashchange', onHashChange)
  })

  const _setHash = useCallback((_newHash: string, replaceInHistory?: boolean) => {
    /*
      window.location.hash can be set with or without the # sign
      we do the same here and prepend # if it is missing

      this also avoids refreshing the page if _newHash is '' and replaceInHistory is true
    */
    const newHash = _newHash[0] === '#' ? _newHash : '#' + _newHash;
    if (newHash !== hash) {
      if(replaceInHistory) {
        window.location.replace(
          window.location.pathname + window.location.search + newHash,
        );
      } else {
        window.location.hash = newHash;
      }
    }
  }, [hash])

  return [hash, _setHash] as const
}
