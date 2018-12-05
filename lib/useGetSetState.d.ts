declare const useGetSetState: <T extends object>(initialState?: T) => [() => T, (patch: Partial<T>) => void];
export default useGetSetState;
