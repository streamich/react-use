export interface Actions<K, V> {
    get: (key: K) => any;
    set: (key: K, value: V) => void;
    remove: (key: K) => void;
    reset: () => void;
}
declare const useMap: <T extends {
    [key: string]: any;
}>(initialMap?: any) => [T, Actions<string, any>];
export default useMap;
