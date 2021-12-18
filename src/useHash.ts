import { useCallback, useState } from 'react';
import useLifecycles from './useLifecycles';
import { off, on } from './misc/util';

/**
 * read and write url hash, response to url hash change
 */
export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash);

  const onHashChange = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useLifecycles(
    () => {
      on(window, 'hashchange', onHashChange);
    },
    () => {
      off(window, 'hashchange', onHashChange);
    }
  );

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
