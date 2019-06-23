import { useEffect, useLayoutEffect } from 'react';

/**
 * `useLayoutEffect` that does not show warning on server.
 * See: https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
