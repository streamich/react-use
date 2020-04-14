import { useLayoutEffect, useState, useRef } from 'react';

type rafPropType = {
  play: () => void,
  pause: () => void,
  restart: () => void,
  stop: () => void,
  seek: (currentElapsed: number) => void,
  reverse: () => void,
  completed: boolean,
  paused: boolean,
  useOnComplete: (fn: () => void) => void
};

const useRafFn = (ms: number = 1e3, autoPlay: boolean = false): [number, rafPropType] => {
  const [elapsed, setElapsed] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(!autoPlay);
  const raf = useRef<number | null>(null);
  const tmpElapsed = useRef<number>(0);     // Used to record the value of elapsed when paused
  const startTime = useRef<number>(0);
  const reversed = useRef<boolean>(false);

  const setRaf = (onFrame: () => void) => {
    raf.current = requestAnimationFrame(onFrame);
  };
  const clearRaf = () => {
    raf.current && cancelAnimationFrame(raf.current);
  };

  const onFrame = () => {
    const pauseElapsed = reversed.current ? 1 - tmpElapsed.current : tmpElapsed.current;
    const currElapsed = Math.min(1, (Date.now() - startTime.current) / ms + pauseElapsed);

    setElapsed(reversed.current ? 1 - currElapsed : currElapsed);
    if (currElapsed === 1) {
      clearRaf();
      setCompleted(true);
      setPaused(true);
      tmpElapsed.current = +reversed.current;
    } else {
      setRaf(onFrame);
    }
  };

  const run = () => {
    clearRaf();
    setPaused(false);
    setCompleted(false);
    startTime.current = Date.now();
    setRaf(onFrame);
  };

  const start = (isReverse: boolean) => {
    // do the reverse during the motion
    if (reversed.current !== isReverse) {
      reversed.current = isReverse;
      tmpElapsed.current = elapsed;
      run();
    } else if (paused) {
      run();
    }
  }
  const play = () => {
    start(false);
  };

  const reverse = () => {
    start(true);
  };

  const pause = () => {
    if ([0, 1].includes(elapsed)) {
      return;
    }
    clearRaf();
    tmpElapsed.current = elapsed;
    setPaused(true);
  };

  const restart = () => {
    setElapsed(0);
    reversed.current = false;
    tmpElapsed.current = 0;
    run();
  };

  const stop = () => {
    clearRaf();
    tmpElapsed.current = 0;
    reversed.current = false;
    setElapsed(0);
    setPaused(true);
    setCompleted(false);
  };

  const seek = (currElapsed : number) => {
    const _currElapsed = Math.max(Math.min(currElapsed, 1), 0);
    const _completed = _currElapsed === +!reversed.current;

    // reversed and completed  => 0
    // !reversed and completed => 1
    // !completed            => _currElapsed
    tmpElapsed.current = _completed ? +reversed.current : _currElapsed;

    clearRaf();
    setElapsed(_currElapsed);
    setPaused(true);
    setCompleted(_completed);
  };

  const useOnComplete = (fn: () => void) => {
    useLayoutEffect(() => {
      completed && fn && fn();
    }, [completed]);  // eslint-disable-line
  }

  useLayoutEffect(() => {
    autoPlay && run();
    return clearRaf;
  }, []);  // eslint-disable-line

  return [elapsed, { play, pause, restart, stop, seek, reverse, paused, completed, useOnComplete }];
};

export default useRafFn;
