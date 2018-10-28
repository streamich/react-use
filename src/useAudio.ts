import * as React from 'react';
import {useEffect, useRef, ReactRef} from './react';
import useSetState from './useSetState';
import parseTimeRanges from './util/parseTimeRanges';

export interface AudioProps extends React.AudioHTMLAttributes<any> {
  src: string;
}

export interface AudioState {
  buffered: any[];
  duration: number;
  isPlaying: boolean;
  muted: boolean;
  time: number;
  volume: number;
}

export interface AudioControls {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
}

const useAudio = (props: AudioProps): [React.ReactElement<AudioProps>, AudioState, AudioControls, ReactRef<HTMLAudioElement | null>] => {
  const [state, setState] = useSetState<AudioState>({
    buffered: [],
    time: 0,
    duration: 0,
    isPlaying: false,
    muted: false,
    volume: 1,
  });
  const ref = useRef<HTMLAudioElement | null>(null);

  const wrapEvent = (userEvent, proxyEvent?) => {
    return (event) => {
      try {
        proxyEvent && proxyEvent(event);
      } finally {
        userEvent && userEvent(event);
      }
    };
  };

  const onPlay = () => setState({isPlaying: true});
  const onPause = () => setState({isPlaying: false});
  const onVolumeChange = (event) => {
    const el = ref.current;
    if (!el) return;
    setState({
      muted: el.muted,
      volume: el.volume,
    });
  };
  const onDurationChange = (event) => {
    const el = ref.current;
    if (!el) return;
    const {duration, buffered} = el;
    setState({
      duration,
      buffered: parseTimeRanges(buffered),
    });
  };
  const onTimeUpdate = () => {
    const el = ref.current;
    if (!el) return;
    setState({time: el.currentTime});
  };
  const onProgress = (event) => {
    const el = ref.current;
    if (!el) return;
    setState({buffered: parseTimeRanges(el.buffered)});
  };

  const element = React.createElement('audio', {
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

  // Some browsers return `Promise` on `.play()` and may throw errors
  // if one tries to execute another `.play()` or `.pause()` while that
  // promise is resolving. So we prevent that with this lock.
  // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
  let lockPlay: boolean = false;

  const controls = {
    play: () => {
      const el = ref.current;
      if (!el) return undefined;

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
      if (!el || (state.duration === undefined)) return;
      time = Math.min(state.duration, Math.max(0, time));
      el.currentTime = time;
    },
    volume: (volume: number) => {
      const el = ref.current;
      if (!el) return;
      volume = Math.min(1, Math.max(0, volume));
      el.volume = volume;
      setState({volume});
    },
    mute: () => {
      const el = ref.current;
      if (!el) return;
      el.muted = true;
    },
    unmute: () => {
      const el = ref.current;
      if (!el) return;
      el.muted = false;
    },
  };

  useEffect(() => {
    const el = ref.current!;

    if (!el) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'useAudio() ref to <audio> element is empty at mount. ' + 
          'It seem you have not rendered the audio element, which is ' +
          'returns as the first argument const [audio] = useAudio(...).'
        );
      }
      return;
    }
    
    // Start media, if autoPlay requested.
    if (props.autoPlay && el.paused) {
      controls.play();
    }

    setState({
      volume: el.volume,
      muted: el.muted,
    });
  }, [props.src]);

  return [element, state, controls, ref];
};

export default useAudio;
