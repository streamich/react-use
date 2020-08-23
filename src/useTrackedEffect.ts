/* eslint-disable */
import { useEffect, useRef, DependencyList } from 'react';

const useTrackedEffect = (effect, deps?: DependencyList) => {
  const initDeps = useRef<DependencyList>();
  const diffTwoDeps = (deps1, deps2) => {
    //Let's do a reference equality check on 2 dependency list.
    //If deps1 is defined, we iterate over deps1 and do comparison on each element with equivalent element from deps2
    //As this func is used only in this hook, we assume 2 deps always have same length.
    return deps1
      ? deps1.map((_ele, idx) => (deps1[idx] != deps2[idx] ? idx : -1)).filter((ele) => ele >= 0)
      : deps2
      ? deps2.map((_ele, idx) => idx)
      : [];
  };
  useEffect(() => {
    let changes = diffTwoDeps(initDeps.current, deps);
    initDeps.current = deps;
    return effect(changes);
  }, deps);
};

export default useTrackedEffect;
