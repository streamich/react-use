declare const useGetSet: <T>(initialValue: T) => [() => T, (value: T) => void];
export default useGetSet;
