export interface Actions<T> {
    set: (list: T[]) => void;
    push: (item: T) => void;
    filter: (fn: (value: T) => boolean) => void;
    sort: (fn?: (a: T, b: T) => number) => void;
}
declare const useList: <T>(initialList?: T[]) => [T[], Actions<T>];
export default useList;
