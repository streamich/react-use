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

const useMouse = (ref: RefObject<HTMLElement>, whenHovered: boolean = false): State => {
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
          const {left, top, width, height} = ref.current.getBoundingClientRect();
          const posX = left + window.scrollX;
          const posY = top + window.scrollY;

          setState({
            docX: event.pageX,
            docY: event.pageY,
            posX,
            posY,
            elX: event.pageX - posX,
            elY: event.pageY - posY,
            elH: height,
            elW: width,
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
