import { RefObject, useEffect, useMemo, useState } from 'react';

export type CacheRef = {
  prevDiff: number;
  evCache: Array<PointerEvent>;
};

export enum ZoomState {
  'ZOOMING_IN' = 'ZOOMING_IN',
  'ZOOMING_OUT' = 'ZOOMING_OUT',
}

export type ZoomStateType = ZoomState.ZOOMING_IN | ZoomState.ZOOMING_OUT;

const usePinchZoom = (ref: RefObject<HTMLElement>) => {
  const cacheRef = useMemo<CacheRef>(
    () => ({
      evCache: [],
      prevDiff: -1,
    }),
    [ref.current]
  );

  const [zoomingState, setZoomingState] = useState<[ZoomStateType, number]>();

  const pointermove_handler = (ev: PointerEvent) => {
    // This function implements a 2-pointer horizontal pinch/zoom gesture.
    //
    // If the distance between the two pointers has increased (zoom in),
    // the target element's background is changed to 'pink' and if the
    // distance is decreasing (zoom out), the color is changed to 'lightblue'.
    //
    // This function sets the target element's border to 'dashed' to visually
    // indicate the pointer's target received a move event.
    // Find this event in the cache and update its record with this event
    for (let i = 0; i < cacheRef.evCache.length; i++) {
      if (ev.pointerId == cacheRef.evCache[i].pointerId) {
        cacheRef.evCache[i] = ev;
        break;
      }
    }

    // If two pointers are down, check for pinch gestures
    if (cacheRef.evCache.length == 2) {
      // console.log(prevDiff)
      // Calculate the distance between the two pointers
      const curDiff = Math.abs(cacheRef.evCache[0].clientX - cacheRef.evCache[1].clientX);

      if (cacheRef.prevDiff > 0) {
        if (curDiff > cacheRef.prevDiff) {
          // The distance between the two pointers has increased
          setZoomingState([ZoomState.ZOOMING_IN, curDiff]);
        }
        if (curDiff < cacheRef.prevDiff) {
          // The distance between the two pointers has decreased
          setZoomingState([ZoomState.ZOOMING_OUT, curDiff]);
        }
      }

      // Cache the distance for the next move event
      cacheRef.prevDiff = curDiff;
    }
  };

  const pointerdown_handler = (ev: PointerEvent) => {
    // The pointerdown event signals the start of a touch interaction.
    // This event is cached to support 2-finger gestures
    cacheRef.evCache.push(ev);
    // console.log('pointerDown', ev);
  };

  const pointerup_handler = (ev: PointerEvent) => {
    // Remove this pointer from the cache and reset the target's
    // background and border
    remove_event(ev);

    // If the number of pointers down is less than two then reset diff tracker
    if (cacheRef.evCache.length < 2) {
      cacheRef.prevDiff = -1;
    }
  };

  const remove_event = (ev: PointerEvent) => {
    // Remove this event from the target's cache
    for (let i = 0; i < cacheRef.evCache.length; i++) {
      if (cacheRef.evCache[i].pointerId == ev.pointerId) {
        cacheRef.evCache.splice(i, 1);
        break;
      }
    }
  };

  useEffect(() => {
    if (ref?.current) {
      ref.current.onpointerdown = pointerdown_handler;
      ref.current.onpointermove = pointermove_handler;
      ref.current.onpointerup = pointerup_handler;
      ref.current.onpointercancel = pointerup_handler;
      ref.current.onpointerout = pointerup_handler;
      ref.current.onpointerleave = pointerup_handler;
    }
  }, [ref?.current]);

  return zoomingState
    ? { zoomingState: zoomingState[0], pinchState: zoomingState[1] }
    : { zoomingState: null, pinchState: 0 };
};

export default usePinchZoom;
