declare const useSetState: <T extends object>(initialState?: T) => [T, (patch: Function | Partial<T>) => void];
export default useSetState;
