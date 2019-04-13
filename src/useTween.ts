import { easing } from 'ts-easing';
import useRaf from './useRaf';

export type Easing = (t: number) => number;

const useTween = (easingName: string = 'inCirc', ms: number = 200, delay: number = 0): number => {
  const fn: Easing = easing[easingName];
  const t = useRaf(ms, delay);

  if (process.env.NODE_ENV !== 'production') {
    if (typeof fn !== 'function') {
      console.error(
        'useTween() expected "easingName" property to be a valid easing function name, like:' +
          '"' +
          Object.keys(easing).join('", "') +
          '".'
      );
      console.trace();
      return 0;
    }
  }

  return fn(t);
};

export default useTween;
