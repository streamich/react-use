import {useState, useEffect} from './react';

const useRaf = (ms: number = 1e12, delay: number = 0): number => {
  const [frames, set] = useState<number>(0);

  useEffect(() => {
    let raf, timerStop, localFrames = frames;

    const onFrame = () => {
      set(++localFrames);
      loop();
    };
    const loop = () => {
      raf = requestAnimationFrame(onFrame);
    };
    const onStart = () => {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(raf);
      }, ms);
      loop();
    };
    const timerDelay = setTimeout(onStart, delay);

    return () => {
      clearTimeout(timerStop);
      clearTimeout(timerDelay);
      cancelAnimationFrame(raf);
    };
  }, [ms, delay]);

  return frames;
};

export default useRaf;
