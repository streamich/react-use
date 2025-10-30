import { useMemo, useRef } from 'react';
import useUpdate from './useUpdate';
import { IHookStateInitAction, IHookStateSetAction, resolveHookState } from './misc/hookState';

export interface StackActions<T> {
  /**
   * @description Push an element onto the stack (top).
   */
  push: (item: T) => void;

  /**
   * @description Pop and return the top element. Returns undefined if empty.
   */
  pop: () => T | undefined;

  /**
   * @description Returns the top element without removing it.
   */
  peek: () => T | undefined;

  /**
   * @description Clear all elements from the stack.
   */
  clear: () => void;

  /**
   * @description Reset stack to its initial value.
   */
  reset: () => void;

  /**
   * @description Replace the entire stack manually.
   */
  set: (newStack: IHookStateSetAction<T[]>) => void;

  /**
   * @description Returns the current stack size.
   */
  size: () => number;
}

/**
 * @name useStack
 * @description React hook that provides stack (LIFO) operations.
 * @example
 * const [stack, { push, pop, peek, clear, reset, size }] = useStack<number>([1, 2]);
 */
function useStack<T>(initialStack: IHookStateInitAction<T[]> = []): [T[], StackActions<T>] {
  const stack = useRef(resolveHookState(initialStack));
  const update = useUpdate();

  const actions = useMemo<StackActions<T>>(() => {
    const a = {
      set: (newStack: IHookStateSetAction<T[]>) => {
        stack.current = resolveHookState(newStack, stack.current);
        update();
      },

      push: (item: T) => {
        a.set((curr: T[]) => curr.concat(item));
      },

      pop: () => {
        if (stack.current.length === 0) return undefined;
        const item = stack.current[stack.current.length - 1];
        a.set((curr: T[]) => curr.slice(0, -1));
        return item;
      },

      peek: () => {
        return stack.current[stack.current.length - 1];
      },

      clear: () => {
        a.set([]);
      },

      reset: () => {
        a.set(resolveHookState(initialStack).slice());
      },

      size: () => {
        return stack.current.length;
      },
    };

    return a as StackActions<T>;
  }, []);

  return [stack.current, actions];
}

export default useStack;
