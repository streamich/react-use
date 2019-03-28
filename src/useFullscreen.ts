import {useEffect, RefObject, useCallback} from 'react';
import screenfull from 'screenfull';
import useToggle from './useToggle'

export interface State {
  fullscreen: boolean
}

const useFullscreen = (ref: RefObject<Element>, videoRef?: RefObject<HTMLVideoElement>): [boolean, (value?: boolean) => void] => {
  const [fullscreen, toggle] = useToggle(false);

  useEffect(() => {
    const onChange = () => {
      if (screenfull) {
        toggle(screenfull.isFullscreen)
      }
    }

    if (screenfull && screenfull.enabled) {
      screenfull.on('change', onChange);
    }

    return () => {
      if (screenfull && screenfull.enabled) {
        screenfull.off('change', onChange);
      }
    }
  }, []);

  const toggleFullscreen = useCallback(async (nextValue?: boolean) => {
    nextValue = typeof nextValue === 'undefined' ? !fullscreen : nextValue;

    if (screenfull && screenfull.enabled) {
      try {
        if (nextValue) {
          await screenfull.request(ref.current || undefined);
        } else {
          await screenfull.exit();
        }
        toggle(nextValue);
      } catch {}
    } else {
      if (videoRef && videoRef.current) {
        if (nextValue) {
          if (videoRef.current.webkitEnterFullscreen) {
            const onWebkitEndFullscreen = () => {
              if (videoRef.current) {
                videoRef.current.removeEventListener('webkitendfullscreen', onWebkitEndFullscreen);
                toggle(false)
              }
            };
  
            videoRef.current.webkitEnterFullscreen();
            toggle(true)
            videoRef.current.addEventListener('webkitendfullscreen', onWebkitEndFullscreen);
          }
        } else if (videoRef.current.webkitExitFullscreen) {
          videoRef.current.webkitExitFullscreen();
          toggle(false)
        }
      }
    }
  }, [fullscreen, toggle])

  return [fullscreen, toggleFullscreen]
};

export default useFullscreen;
