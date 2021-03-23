import { useEffect, EffectCallback, DependencyList } from "react";

const FALSE_DEP_ARRAY = [{}];
const NOOP = () => {};

export const useConditionalEffect = (
  condition: boolean,
  effect: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  useEffect(condition ? effect : NOOP, condition ? dependencies : FALSE_DEP_ARRAY);
};
