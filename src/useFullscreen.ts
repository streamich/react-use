import {useLayoutEffect, RefObject, useState} from 'react';
import screenfull from 'screenfull';

export interface FullScreenOptions {
  video?: HTMLVideoElement;
  onClose?: (error?: Error) => void;
}

const noop = () => {};

const useFullscreen = (ref: RefObject<Element>, on: boolean, options: FullScreenOptions = {}): boolean => {
  const {video, onClose = noop} = options;
  const [isFullscreen, setIsFullscreen] = useState(on);

  useLayoutEffect(() => {
    if (!on) return;
    if (!ref.current) return;

    const onWebkitEndFullscreen = () => {
      video!.removeEventListener('webkitendfullscreen', onWebkitEndFullscreen);
      onClose();
    };

    const onChange = () => {
      if (screenfull) {
        const isFullscreen = screenfull.isFullscreen;
        setIsFullscreen(isFullscreen);
        if (!isFullscreen) {
          onClose();
        }
      }
    };

    if (screenfull && screenfull.enabled) {
      try {
        screenfull.request(ref.current);
        setIsFullscreen(true);
      } catch (error) {
        onClose(error);
        setIsFullscreen(false);
      }
      screenfull.on('change', onChange);
    } else {
      if (video && video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
        video.addEventListener('webkitendfullscreen', onWebkitEndFullscreen);
        setIsFullscreen(true);
      } else {
        onClose();
        setIsFullscreen(false);
      }
    }

    return () => {
      setIsFullscreen(false);
      if (screenfull && screenfull.enabled) {
        try {
          screenfull.off('change', onChange);
          screenfull.exit();
        } catch {}
      } else if (video && video.webkitExitFullscreen) {
        video.removeEventListener('webkitendfullscreen', onWebkitEndFullscreen);
        video.webkitExitFullscreen();
      }
    }
  }, [ref.current, video, on]);

  return isFullscreen;
};

export default useFullscreen;
