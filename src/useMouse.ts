import {useState, useEffect, useRef, RefObject} from 'react';

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

const useMouse = (ref: RefObject<HTMLElement>): State => {
  const frame = useRef(0);
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
    const handler = (event: MouseEvent) => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        if (ref && ref.current) {
          const {left, top} = ref.current.getBoundingClientRect()
          const posX = left + window.scrollX;
          const posY = top + window.scrollY;

          setState({
            docX: event.pageX,
            docY: event.pageY,
            posX,
            posY,
            elX: event.pageX - posX,
            elY: event.pageY - posY,
            elH: ref.current.offsetHeight,
            elW: ref.current.offsetWidth,
          });
        }
      });
    }

    document.addEventListener('mousemove', handler);

    return () => {
      cancelAnimationFrame(frame.current);
      document.removeEventListener('mousemove', handler);
    };
  }, []);

  return state;
}

export default useMouse
