import {useState, useEffect, useRef, RefObject} from 'react';
import useToggle from "./useToggle";

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
  const frame = useRef(0);
  const [active, setActive] = useToggle(false);
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
    const enterHandler = () => setActive(true)
    const leaveHandler = () => setActive(false)

    if (whenHovered && ref && ref.current) {
      ref.current.addEventListener("mouseenter", enterHandler, false);
      ref.current.addEventListener("mouseleave", leaveHandler, false);
    }

    return () => {
      if (whenHovered && ref && ref.current) {
        ref.current.removeEventListener("mouseenter", enterHandler);
        ref.current.removeEventListener("mouseleave", leaveHandler);
      }
    };
  }, [whenHovered, ref]);

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

    if (active || !whenHovered) {
      document.addEventListener('mousemove', moveHandler);
    }

    return () => {
      if (active || !whenHovered) {
        cancelAnimationFrame(frame.current);
        document.removeEventListener('mousemove', moveHandler);
      }
    };
  }, [active, whenHovered, ref])

  return state;
}

export default useMouse
