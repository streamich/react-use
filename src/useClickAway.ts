import { RefObject, useEffect, useRef } from 'react';
import { off, on } from './misc/util';

export type Events = (keyof GlobalEventHandlersEventMap)[];

const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  events: Events = ['mousedown', 'touchstart']
) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect(() => {
    const { current: el } = ref;
    if (!el) return;

    const rootNode = el.getRootNode();
    const isInShadow = rootNode instanceof ShadowRoot;

    /**
     * When events are captured outside the component, events that occur in shadow DOM will target the host element
     * so additional event listeners need to be added for shadowDom
     *
     *  document       shadowDom            target
     *    |                |                   |
     *    |- on(document) -|-  on(shadowRoot) -|
     */
    const handler = (event) => {
      !el.contains(event.target) &&
        event.target.shadowRoot !== rootNode &&
        savedCallback.current(event);
    };
    for (const eventName of events) {
      on(document, eventName, handler);
      isInShadow && on(rootNode, eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
        isInShadow && off(rootNode, eventName, handler);
      }
    };
  }, [events, ref]);
};

export default useClickAway;
