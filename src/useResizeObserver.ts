import { RefObject, useEffect, useRef, useState } from 'react';
import { isClient } from './util';
declare const ResizeObserver: ResizeObserver;

export interface ResizeObserverResult {
  width: number;
  height: number;
}

export type ResizeObserverHook = (defaults: Partial<ResizeObserverResult>) => [ResizeObserverResult, RefObject<Element>];

let useResizeObserver: ResizeObserverHook;

if (isClient) {
  useResizeObserver = (
    {width = Infinity, height = Infinity}: Partial<ResizeObserverResult> = {}
  ): ResizeObserverResult => {
    const ref = useRef<Element>(null);
    const [state, setState] = useState<ResizeObserverResult>({ width, height });

    useEffect(() => {
      const element = ref.current;
      if (!element) {
        return;
      }
      const observer = new ResizeObserver(([{ contentRect }]) => {
        // tslint:disable-next-line no-shadowed-variable
        const { width, height } = contentRect;
        setState({ width, height });
      });
      observer.observe(element);
      return () => observer.disconnect();
    }, [ref.current]);

    return state;
  };
} else {
  useResizeObserver = ({ width = Infinity, height = Infinity } = {}) => {
    return { width, height };
  };
}

export default useResizeObserver;
