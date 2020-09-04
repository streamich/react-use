/* eslint-disable */
import { useState, useCallback } from "react"
import useLifecycles from "./useLifecycles"
import { isClient } from './util';

/**
 * read and write url hash, response to url hash change
 */
const useHashClient = () => {
  const [hash, setHash] = useState(() => window.location.hash)

  const onHashChange = useCallback(() => {
    setHash(window.location.hash)
  }, [])

  useLifecycles(() => {
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

/**
 * return default values when useHash is called from server
 */
const useHashServer= () => {
  console.warn('useHash cannot detect hash value when it is called from server');
  return ['', () => {}] as const
};

export const useHash = isClient ? useHashClient : useHashServer;