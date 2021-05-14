import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from './misc/util.js';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
