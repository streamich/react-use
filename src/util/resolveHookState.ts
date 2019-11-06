export type StateSetter<S> = (prevState: S) => S;
export type InitialStateSetter<S> = () => S;

export type InitialHookState<S> = S | InitialStateSetter<S>;
export type HookState<S> = S | StateSetter<S>;
export type ResolvableHookState<S> = S | StateSetter<S> | InitialStateSetter<S>;

export function resolveHookState<S>(newState: InitialStateSetter<S>): S;
export function resolveHookState<S>(newState: StateSetter<S>, currentState: S): S;
export function resolveHookState<S>(newState: ResolvableHookState<S>, currentState?: S): S;
export function resolveHookState<S>(newState: ResolvableHookState<S>, currentState?: S): S {
  if (typeof newState === 'function') {
    return (newState as Function)(currentState);
  }

  return newState;
}
