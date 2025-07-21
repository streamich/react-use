// import * as React from 'react';
// import { noop } from './misc/util';

// const { useState } = React;

// export type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;

// const useHover = (element: Element): [React.ReactElement<any>, boolean] => {
//   const [state, setState] = useState(false);

//   const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
//     (originalOnMouseEnter || noop)(event);
//     setState(true);
//   };
//   const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
//     (originalOnMouseLeave || noop)(event);
//     setState(false);
//   };

//   if (typeof element === 'function') {
//     element = element(state);
//   }

//   const el = React.cloneElement(element, {
//     onMouseEnter: onMouseEnter(element.props.onMouseEnter),
//     onMouseLeave: onMouseLeave(element.props.onMouseLeave),
//   });

//   return [el, state];
// };

// export default useHover;


import * as React from 'react';
import { noop } from './misc/util';

const { useState } = React;

export type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;

interface UseHoverOptions {
  stopPropagation?: boolean;
}

const useHover = (
  element: Element,
  options: UseHoverOptions = {}
): [React.ReactElement<any>, boolean] => {
  const [state, setState] = useState(false);
  const { stopPropagation = false } = options;

  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    if (stopPropagation) event.stopPropagation();
    (originalOnMouseEnter || noop)(event);
    setState(true);
  };

  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    if (stopPropagation) event.stopPropagation();
    (originalOnMouseLeave || noop)(event);
    setState(false);
  };

  if (typeof element === 'function') {
    element = element(state);
  }

  const el = React.cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
  });

  return [el, state];
};

export default useHover;
