import { useCallback, useEffect, useMemo, useState } from 'react';

let timers: any[] = [];

interface CountDownAction {
  start: () => void;
  stop: () => void;
  pause: () => void;
}

export const useCountDown = (initialValue: number): [number | null, CountDownAction] => {
  const [countDown, setCountDown] = useState<null | number>(null);
  if (typeof initialValue !== 'number') {
    throw new TypeError('initialValue has to be a number, got ' + typeof initialValue);
  }

  if (typeof initialValue === 'number' && initialValue <= 0) {
    throw new RangeError('initialValue has to be a number greater than 0, got ' + typeof initialValue);
  }

  const descNumber = useCallback(() => {
    if (countDown && countDown - 1) {
      setCountDown(countDown - 1);
    } else {
      setCountDown(null);
    }
  }, [countDown]);
  const timerIndex = useMemo(() => timers.push(undefined), []);

  useEffect(() => {
    timers[timerIndex] = setTimeout(descNumber, 1000);
  }, [countDown]);

  function start() {
    timers[timerIndex] = clearTimeout(timers[timerIndex]);
    if (countDown) {
      setTimeout(descNumber, 1000);
    } else {
      setCountDown(initialValue);
    }
  }
  function pause() {
    timers[timerIndex] = clearTimeout(timers[timerIndex]);
  }
  function stop() {
    timers[timerIndex] = clearTimeout(timers[timerIndex]);
    setCountDown(null);
  }
  return [countDown ?? 0, { start, stop, pause }];
};
export default useCountDown;
