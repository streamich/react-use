declare const useLocalStorage: <T>(key: string, initialValue?: T | undefined, raw?: boolean | undefined) => [T, (value: T) => void];
export default useLocalStorage;
