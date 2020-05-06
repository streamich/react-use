/* eslint-disable */
import { useState, useCallback } from "react"
import useLifecycles from "./useLifecycles"
import { isClient } from './util';

/**
 * read and write url hash, response to url hash change
 */
export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash)

  const onHashChange = useCallback(() => {
    setHash(window.location.hash)
  }, [])

  useLifecycles(() => {
    if (!isClient) {
      return;
    }
    window.addEventListener('hashchange', onHashChange)
  }, () => {
    window.removeEventListener('hashchange', onHashChange)
  })

  const _setHash = useCallback((newHash: string) => {
    if (newHash !== hash) {
      window.location.hash = newHash
    }
  }, [hash])

  return [hash, _setHash] as const
}