import { DependencyList, useEffect } from 'react';

export type EffectCallbackWithSignal = (signal: AbortSignal) => void | (() => void | undefined);

export default function useSignallingEffect(
  effect: EffectCallbackWithSignal,
  deps?: DependencyList
) {
  useEffect(() => {
    const controller = new AbortController();
    const cleanup = effect(controller.signal);

    return () => {
      controller.abort();
      cleanup && cleanup();
    };
  }, deps);
}
