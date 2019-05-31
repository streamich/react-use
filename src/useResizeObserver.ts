import { RefObject, useEffect, useState } from 'react';
import { isClient } from './util';
declare const ResizeObserver: ResizeObserver;

export interface ResizeObserverResult {
  width: number;
  height: number;
}

const useResizeObserver = !isClient
  ? (ref: RefObject<Element>, { width = Infinity, height = Infinity }: Partial<ResizeObserverResult> = {}) => {
      return { width, height };
    }
  : (
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

export default useResizeObserver;
