import { RefObject, useState } from 'react';
import screenfull from 'screenfull';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { noop, off, on } from './misc/util';

export interface FullScreenOptions {
  video?: RefObject<
    HTMLVideoElement & { webkitEnterFullscreen?: () => void; webkitExitFullscreen?: () => void }
  >;
  onClose?: (error?: Error) => void;
}

const useFullscreen = (
  ref: RefObject<Element>,
  enabled: boolean,
  options: FullScreenOptions = {}
): boolean => {
  const { video, onClose = noop } = options;
  const [isFullscreen, setIsFullscreen] = useState(enabled);

  useIsomorphicLayoutEffect(() => {
    if (!enabled) {
      return;
    }
    if (!ref.current) {
      return;
    }

    const onWebkitEndFullscreen = () => {
      if (video?.current) {
        off(video.current, 'webkitendfullscreen', onWebkitEndFullscreen);
      }
      onClose();
    };

    const onChange = () => {
      if (screenfull.isEnabled) {
        const isScreenfullFullscreen = screenfull.isFullscreen;
        setIsFullscreen(isScreenfullFullscreen);
        if (!isScreenfullFullscreen) {
          onClose();
        }
      }
    };

    if (screenfull.isEnabled) {
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
      on(video.current, 'webkitendfullscreen', onWebkitEndFullscreen);
      setIsFullscreen(true);
    } else {
      onClose();
      setIsFullscreen(false);
    }

    return () => {
      setIsFullscreen(false);
      if (screenfull.isEnabled) {
        try {
          screenfull.off('change', onChange);
          screenfull.exit();
        } catch {}
      } else if (video && video.current && video.current.webkitExitFullscreen) {
        off(video.current, 'webkitendfullscreen', onWebkitEndFullscreen);
        video.current.webkitExitFullscreen();
      }
    };
  }, [enabled, video, ref]);

  return isFullscreen;
};

export default useFullscreen;
