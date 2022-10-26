import * as React from 'react';

const { useState } = React;

export type Element = ((state: boolean) => React.ReactElement) | React.ReactElement;

const useHover = (element: Element) => {
  const [state, setState] = useState(false);

  const onMouseEnter =
    (originalOnMouseEnter?: React.MouseEventHandler) => (event: React.MouseEvent) => {
      originalOnMouseEnter?.(event);
      setState(true);
    };
  const onMouseLeave =
    (originalOnMouseLeave?: React.MouseEventHandler) => (event: React.MouseEvent) => {
      originalOnMouseLeave?.(event);
      setState(false);
    };

  if (typeof element === 'function') {
    element = element(state);
  }

  const el = React.cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
  });

  return [el, state] as const;
};

export default useHover;
