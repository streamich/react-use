import * as React from 'react';
import { useEffect, useRef } from 'react';
import useSetState from '../useSetState';
import parseTimeRanges from '../misc/parseTimeRanges';

export interface HTMLMediaProps
  extends React.AudioHTMLAttributes<any>,
    React.VideoHTMLAttributes<any> {
  src: string;
}

export interface HTMLMediaState {
  buffered: any[];
  duration: number;
  paused: boolean;
  muted: boolean;
  time: number;
  volume: number;
}

export interface HTMLMediaControls {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
}

type MediaPropsWithRef<T> = HTMLMediaProps & { ref?: React.MutableRefObject<T | null> };

export default function createHTMLMediaHook<T extends HTMLAudioElement | HTMLVideoElement>(
  tag: 'audio' | 'video'
) {
  return (elOrProps: HTMLMediaProps | React.ReactElement<HTMLMediaProps>) => {
    let element: React.ReactElement<MediaPropsWithRef<T>> | undefined;
    let props: MediaPropsWithRef<T>;

    if (React.isValidElement(elOrProps)) {
      element = elOrProps;
      props = element.props;
    } else {
      props = elOrProps;
    }

    const [state, setState] = useSetState<HTMLMediaState>({
      buffered: [],
      time: 0,
      duration: 0,
      paused: true,
      muted: false,
      volume: 1,
    });
    const ref = useRef<T | null>(null);

    const wrapEvent = (userEvent, proxyEvent?) => {
      return (event) => {
        try {
          proxyEvent && proxyEvent(event);
        } finally {
          userEvent && userEvent(event);
        }
      };
    };

    const onPlay = () => setState({ paused: false });
    const onPause = () => setState({ paused: true });
    const onVolumeChange = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      setState({
        muted: el.muted,
        volume: el.volume,
      });
    };
    const onDurationChange = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      const { duration, buffered } = el;
      setState({
        duration,
        buffered: parseTimeRanges(buffered),
      });
    };
    const onTimeUpdate = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      setState({ time: el.currentTime });
    };
    const onProgress = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      setState({ buffered: parseTimeRanges(el.buffered) });
    };

    if (element) {
      element = React.cloneElement(element, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress),
      });
    } else {
      element = React.createElement(tag, {
        controls: false,
        ...props,
        ref,
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress),
      } as any); // TODO: fix this typing.
    }

    // Some browsers return `Promise` on `.play()` and may throw errors
    // if one tries to execute another `.play()` or `.pause()` while that
    // promise is resolving. So we prevent that with this lock.
    // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
    let lockPlay: boolean = false;

    const controls = {
      play: () => {
        const el = ref.current;
        if (!el) {
          return undefined;
        }

        if (!lockPlay) {
          const promise = el.play();
          const isPromise = typeof promise === 'object';

          if (isPromise) {
            lockPlay = true;
            const resetLock = () => {
              lockPlay = false;
            };
            promise.then(resetLock, resetLock);
          }

          return promise;
        }
        return undefined;
      },
      pause: () => {
        const el = ref.current;
        if (el && !lockPlay) {
          return el.pause();
        }
      },
      seek: (time: number) => {
        const el = ref.current;
        if (!el || state.duration === undefined) {
          return;
        }
        time = Math.min(state.duration, Math.max(0, time));
        el.currentTime = time;
      },
      volume: (volume: number) => {
        const el = ref.current;
        if (!el) {
          return;
        }
        volume = Math.min(1, Math.max(0, volume));
        el.volume = volume;
        setState({ volume });
      },
      mute: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        el.muted = true;
      },
      unmute: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        el.muted = false;
      },
    };

    useEffect(() => {
      const el = ref.current!;

      if (!el) {
        if (process.env.NODE_ENV !== 'production') {
          if (tag === 'audio') {
            console.error(
              'useAudio() ref to <audio> element is empty at mount. ' +
                'It seem you have not rendered the audio element, which it ' +
                'returns as the first argument const [audio] = useAudio(...).'
            );
          } else if (tag === 'video') {
            console.error(
              'useVideo() ref to <video> element is empty at mount. ' +
                'It seem you have not rendered the video element, which it ' +
                'returns as the first argument const [video] = useVideo(...).'
            );
          }
        }
        return;
      }

      setState({
        volume: el.volume,
        muted: el.muted,
        paused: el.paused,
      });

      // Start media, if autoPlay requested.
      if (props.autoPlay && el.paused) {
        controls.play();
      }
    }, [props.src]);

    return [element, state, controls, ref] as const;
  };
}
