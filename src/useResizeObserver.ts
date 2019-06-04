import { RefObject, useEffect, useState } from 'react';
import { isClient } from './util';
declare const ResizeObserver: ResizeObserver;

export interface ResizeObserverResult {
  width: number;
  height: number;
}

export type ResizeObserverHook = (
  ref: RefObject<Element>,
  defaults: Partial<ResizeObserverResult>
) => ResizeObserverResult;

let useResizeObserver: ResizeObserverHook;

if (isClient) {
  useResizeObserver = (
    ref: RefObject<Element>,
    { width = Infinity, height = Infinity }: Partial<ResizeObserverResult> = {}
  ): ResizeObserverResult => {
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
  useResizeObserver = (ref, { width = Infinity, height = Infinity } = {}) => {
    return { width, height };
  };
}

export default useResizeObserver;
