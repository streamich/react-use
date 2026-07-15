import { useCallback, useEffect, useState } from 'react';
import { off, on } from './misc/util';
import { isServer } from './misc/isServer';

/**
 * read and write url hash, response to url hash change
 */

export const useHash = () => {
  const [hash, setHash] = useState(() => (isServer() ? '' : window.location.hash));

  const onHashChange = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    if (isServer()) return;
    on(window, 'hashchange', onHashChange);

    return () => {
      off(window, 'hashchange', onHashChange);
    };
  }, []);

  const _setHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash]
  );

  return [hash, _setHash] as const;
};
