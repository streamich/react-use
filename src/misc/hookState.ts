export type IHookStateInitialSetter<S> = () => S;
export type IHookStateInitAction<S> = S | IHookStateInitialSetter<S>;

export type IHookStateSetter<S> = ((prevState: S) => S) | (() => S);
export type IHookStateSetAction<S> = S | IHookStateSetter<S>;

export type IHookStateResolvable<S> = S | IHookStateInitialSetter<S> | IHookStateSetter<S>;

export function resolveHookState<S>(nextState: IHookStateInitAction<S>): S;
export function resolveHookState<S, C extends S>(
  nextState: IHookStateSetAction<S>,
  currentState?: C
): S;
export function resolveHookState<S, C extends S>(
  nextState: IHookStateResolvable<S>,
  currentState?: C
): S;
export function resolveHookState<S, C extends S>(
  nextState: IHookStateResolvable<S>,
  currentState?: C
): S {
  if (typeof nextState === 'function') {
    return nextState.length ? (nextState as Function)(currentState) : (nextState as Function)();
  }

  return nextState;
}
