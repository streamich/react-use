import { RefObject } from 'react';
import useHoverDirty from './useHoverDirty';
import useMouse, { State } from './useMouse';

export interface UseMouseHoveredOptions {
  whenHovered?: boolean;
  bound?: boolean;
}

const nullRef = { current: null };

const useMouseHovered = (ref: RefObject<Element>, options: UseMouseHoveredOptions = {}): State => {
  const whenHovered = !!options.whenHovered;
  const bound = !!options.bound;

  const isHovered = useHoverDirty(ref, whenHovered);
  const state = useMouse(whenHovered && !isHovered ? nullRef : ref);

  if (bound) {
    state.elX = Math.max(0, Math.min(state.elX, state.elW));
    state.elY = Math.max(0, Math.min(state.elY, state.elH));
  }

  return state;
};

export default useMouseHovered;
