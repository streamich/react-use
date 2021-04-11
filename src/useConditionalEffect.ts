import { useEffect, useLayoutEffect, EffectCallback, DependencyList } from 'react';

const NOOP = () => {};

const fakeDeps: {
  [index: number]: undefined[];
} = {};

const getFakeDependencyList = (dependencies: DependencyList | undefined) => {
  if (dependencies === undefined) {
    return undefined;
  }

  if (fakeDeps[dependencies.length] === undefined) {
    fakeDeps[dependencies.length] = new Array(dependencies.length);
  }

  return fakeDeps[dependencies.length];
};

export const useConditionalEffect = (
  condition: boolean,
  effect: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  useEffect(
    condition ? effect : NOOP,
    condition ? dependencies : getFakeDependencyList(dependencies)
  );
};

export const useConditionalLayoutEffect = (
  condition: boolean,
  effect: EffectCallback,
  dependencies: DependencyList | undefined
) => {
  useLayoutEffect(
    condition ? effect : NOOP,
    condition ? dependencies : getFakeDependencyList(dependencies)
  );
};
