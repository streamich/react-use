import { MutableRefObject } from "react";

type Ref<T> =
  | ((instance: T) => void)
  | MutableRefObject<T>
  | null;

function combineRefs<T>(...refs: Ref<T>[]) {
  return function (instance: T) {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
        return;
      }
      if (ref) {
        ref.current = instance;
      }
    });
  };
}

export default combineRefs