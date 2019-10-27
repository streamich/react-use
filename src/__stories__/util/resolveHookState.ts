export function resolveHookState<S>(state: S | (() => S)): S {
  return typeof state === 'function' ? (state as () => S)() : state;
}
