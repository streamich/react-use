export function resolveHookState<S>(state: S | (() => S)): S {
  if (typeof state === 'function') {
    return (state as () => S)();
  }

  return state;
}
