import {useLayoutEffect, RefObject, useState} from 'react';
import screenfull from 'screenfull';

export interface FullScreenOptions {
  video?: RefObject<HTMLVideoElement>;
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
      video!.current!.removeEventListener('webkitendfullscreen', onWebkitEndFullscreen);
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
    } else if (video && video.current && video.current.webkitEnterFullscreen) {
      video.current.webkitEnterFullscreen();
      video.current.addEventListener('webkitendfullscreen', onWebkitEndFullscreen);
      setIsFullscreen(true);
    } else {
      onClose();
      setIsFullscreen(false);
    }

    return () => {
      setIsFullscreen(false);
      if (screenfull && screenfull.enabled) {
        try {
          screenfull.off('change', onChange);
          screenfull.exit();
        } catch {}
      } else if (video && video.current && video.current.webkitExitFullscreen) {
        video.current.removeEventListener('webkitendfullscreen', onWebkitEndFullscreen);
        video.current.webkitExitFullscreen();
      }
    }
  }, [ref.current, video, on]);

  return isFullscreen;
};

export default useFullscreen;
