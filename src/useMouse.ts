import {useState, useEffect, useRef, RefObject} from 'react';
import useHoverDirty from "./useHoverDirty";

export interface State {
  docX: number;
  docY: number;
  posX: number;
  posY: number;
  elX: number;
  elY: number;
  elH: number;
  elW: number;
}

export interface UseMouseOptions {
  whenHovered?: boolean;
  bound?: boolean;
}

const useMouse = (ref: RefObject<HTMLElement>, {whenHovered = false, bound = false}: UseMouseOptions = {}): State => {
  if (process.env.NODE_ENV === 'development') {
    if ((typeof ref !== 'object') || (typeof ref.current === 'undefined')) {
      console.error('useMouse expects a single ref argument.');
    }
  }

  const frame = useRef(0);
  const isHovered = useHoverDirty(ref, whenHovered);
  const [state, setState] = useState<State>({
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0,
  });

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        if (ref && ref.current) {
          const {left, top, width: elW, height: elH} = ref.current.getBoundingClientRect();
          const posX = left + window.scrollX;
          const posY = top + window.scrollY;
          const elX = event.pageX - posX;
          const elY = event.pageY - posY;

          setState({
            docX: event.pageX,
            docY: event.pageY,
            posX,
            posY,
            elX: bound ? Math.max(0, Math.min(elX, elW)) : elX,
            elY: bound ? Math.max(0, Math.min(elY, elH)) : elY,
            elH,
            elW,
          });
        }
      });
    }

    if (isHovered || !whenHovered) {
      document.addEventListener('mousemove', moveHandler);
    }

    return () => {
      if (isHovered || !whenHovered) {
        cancelAnimationFrame(frame.current);
        document.removeEventListener('mousemove', moveHandler);
      }
    };
  }, [isHovered, whenHovered, ref])

  return state;
}

export default useMouse
