import { useLayoutEffect, EffectCallback, DependencyList } from "react";

const FALSE_DEP_ARRAY = [{}];
const NOOP = () => {};

export const useConditionalLayoutEffect = (
  condition: boolean,
  effect: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  useLayoutEffect(condition ? effect : NOOP, condition ? dependencies : FALSE_DEP_ARRAY);
};
