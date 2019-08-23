import { RefObject, useEffect, useRef } from 'react';

export function getClosestBody(el: Element | HTMLElement | HTMLIFrameElement | null): HTMLElement | null {
  if (!el) {
    return null;
  } else if (el.tagName === 'BODY') {
    return el as HTMLElement;
  } else if (el.tagName === 'IFRAME') {
    const document = (el as HTMLIFrameElement).contentDocument;
    return document ? document.body : null;
  } else if (!(el as HTMLElement).offsetParent) {
    return null;
  }

  return getClosestBody((el as HTMLElement).offsetParent!);
}

export interface BodyInfoItem {
  counter: number;
  initialOverflow: string | null;
}

const bodies: Map<HTMLElement, BodyInfoItem> = new Map();

const doc: Document | undefined = typeof document === 'object' ? document : undefined;

export default !doc
  ? function useLockBodyMock(_locked: boolean = true, _elementRef?: RefObject<HTMLElement>) {}
  : function useLockBody(locked: boolean = true, elementRef?: RefObject<HTMLElement>) {
      elementRef = elementRef || useRef(doc!.body);

      useEffect(() => {
        const body = getClosestBody(elementRef!.current);
        if (!body) {
          return;
        }

        const bodyInfo = bodies.get(body);

        if (locked) {
          if (!bodyInfo) {
            bodies.set(body, { counter: 1, initialOverflow: body.style.overflow });
            body.style.overflow = 'hidden';
          } else {
            bodies.set(body, { counter: bodyInfo.counter + 1, initialOverflow: bodyInfo.initialOverflow });
          }
        } else {
          if (bodyInfo) {
            if (bodyInfo.counter === 1) {
              bodies.delete(body);
              body.style.overflow = bodyInfo.initialOverflow;
            } else {
              bodies.set(body, { counter: bodyInfo.counter - 1, initialOverflow: bodyInfo.initialOverflow });
            }
          }
        }
      }, [locked, elementRef.current]);
    };
