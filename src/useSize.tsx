import * as React from 'react';
import {useState, useEffect, useRef} from './react';

const isClient = typeof window === 'object';
const DRAF = (callback: () => void) => setTimeout(callback, 35);

export interface State {
  width: number;
  height: number;
}

const useSize = (element: React.ReactElement<any>, {width = Infinity, height = Infinity}: Partial<State> = {}): [React.ReactElement<any>, State] => {
  if (!isClient) {
    return [element, {width, height}];
  }

  const [state, setState] = useState<State>({width, height});
  const style = element.props.style || {};
  const ref = useRef<HTMLIFrameElement | null>(null);
  let window: Window | null = null;
  const setSize = () => {
    const iframe = ref.current;
    const size = iframe
      ? {
          width: iframe.offsetWidth,
          height: iframe.offsetHeight,
        }
      : {width, height,};

    setState(size);
  }
  const onWindow = (window: Window) => {
    window.addEventListener('resize', setSize);
    DRAF(setSize);
  };

  useEffect(() => {
    const iframe: HTMLIFrameElement = ref.current!;
    if (iframe.contentWindow) {
      window = iframe.contentWindow!;
      onWindow(window);
    } else {
      const onLoad = () => {
        iframe.removeEventListener('load', onLoad);
        window = iframe.contentWindow!;
        onWindow(window);
      };

      iframe.addEventListener('load', onLoad);
    }

    return () => {
      if (window) {
        window.removeEventListener('resize', setSize);
      }
    };
  }, [0]);

  style.position = 'relative';

  const sized =  React.cloneElement(element, {style}, ...[
    React.createElement('iframe', {
      ref,
      style: {
        background: 'transparent',
        border: 'none',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1
      }
    }),
    ...React.Children.toArray(element.props.children)
  ]);

  return [sized, state];
};

export default useSize;
