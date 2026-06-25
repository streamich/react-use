import { useEffect, useReducer, RefObject } from 'react';

enum ActionTypes {
  Scrolled = 'SCROLLED',
}

type Actions = {
  type: ActionTypes.Scrolled;
  isScrollableUp: boolean;
  isScrollableRight: boolean;
  isScrollableDown: boolean;
  isScrollableLeft: boolean;
};

type ScrollDirections = 'up' | 'right' | 'down' | 'left';

type ScrollDirectionBasedOptions<T> = {
  [key in ScrollDirections]?: T;
};

interface Options {
  /* Disables updates for specific direction. Use to optimize number of rerenders. */
  disabledListeners?: ScrollDirectionBasedOptions<boolean>;
  /* Adds an offset for the direction in pixels. */
  offsets?: ScrollDirectionBasedOptions<number>;
  /* The debounced rate in which the onScroll state update will be triggered */
  debounceMs?: number;
}

const defaultOptions: Options = {
  disabledListeners: {},
  offsets: {},
  debounceMs: 0,
};

const initialState = {
  isScrollableUp: false,
  isScrollableRight: false,
  isScrollableDown: false,
  isScrollableLeft: false,
};

function reducer(state: typeof initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.Scrolled:
      const { isScrollableUp, isScrollableRight, isScrollableDown, isScrollableLeft } = action;
      const stateHasChanged =
        isScrollableUp !== state.isScrollableUp ||
        isScrollableRight !== state.isScrollableRight ||
        isScrollableDown !== state.isScrollableDown ||
        isScrollableLeft !== state.isScrollableLeft;

      return stateHasChanged ? { isScrollableUp, isScrollableRight, isScrollableDown, isScrollableLeft } : state;
    default:
      return state;
  }
}

export const useScrollableDirection = (
  scrollContainerRef: RefObject<HTMLElement>,
  options = defaultOptions
): [[boolean, boolean], [boolean, boolean]] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isScrollableUp, isScrollableRight, isScrollableDown, isScrollableLeft } = state;

  useEffect(() => {
    const element = scrollContainerRef.current;
    let timeout: number | undefined;

    const updateScrollState = () => {
      if (element) {
        let { isScrollableUp, isScrollableRight, isScrollableDown, isScrollableLeft } = initialState;

        if (!options.disabledListeners?.up) {
          isScrollableUp = element.scrollTop - (options.offsets?.up ?? 0) > 0;
        }
        if (!options.disabledListeners?.right) {
          isScrollableRight =
            element.scrollWidth - element.clientWidth - (options.offsets?.right ?? 0) > element.scrollLeft;
        }
        if (!options.disabledListeners?.down) {
          isScrollableDown =
            element.scrollTop + element.clientHeight + (options.offsets?.down ?? 0) < element.scrollHeight;
        }
        if (!options.disabledListeners?.left) {
          isScrollableLeft = element.scrollLeft - (options.offsets?.left ?? 0) > 0;
        }

        dispatch({
          type: ActionTypes.Scrolled,
          isScrollableUp,
          isScrollableRight,
          isScrollableDown,
          isScrollableLeft,
        });
      }
    };

    const onScroll = () => {
      if (element) {
        if (timeout) clearInterval(timeout);
        timeout = setTimeout(updateScrollState, options.debounceMs);
      }
    };

    if (element) {
      // Initializes correct state when ref is initially assigned.
      updateScrollState();
      element.addEventListener('scroll', onScroll, { capture: false, passive: true });
    }

    return () => {
      if (timeout) clearInterval(timeout);
      if (element) {
        element.removeEventListener('scroll', onScroll);
      }
    };
  }, [scrollContainerRef, options]);

  return [
    [isScrollableLeft, isScrollableRight],
    [isScrollableUp, isScrollableDown],
  ];
};
