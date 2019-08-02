import { useEffect, useRef, useState } from 'react';

export type RafLoopReturns = [() => void, boolean, () => void];

export default function useRafLoop(callback: CallableFunction): RafLoopReturns {
  const raf = useRef<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  function loopStep() {
    callback();
    raf.current = requestAnimationFrame(loopStep);
  }

  function loopStop() {
    setIsActive(false);
  }

  function loopStart() {
    setIsActive(true);
  }

  function clearCurrentLoop() {
    raf.current && cancelAnimationFrame(raf.current);
  }

  useEffect(() => clearCurrentLoop, []);

  useEffect(() => {
    clearCurrentLoop();
    isActive && (raf.current = requestAnimationFrame(loopStep));

    return clearCurrentLoop;
  }, [isActive, callback]);

  return [loopStop, isActive, loopStart];
}
