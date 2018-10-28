export declare type UseState = <T>(initialState: T) => [T, (newState: T) => void];
export declare const useState: UseState;
export declare type UseEffect = (didUpdate: () => ((() => void) | void), params?: any[]) => void;
export declare const useEffect: UseEffect;
export interface ReactRef<T> {
    current: T;
}
export declare type UseRef = <T>(initialValue: T) => ReactRef<T>;
export declare const useRef: UseRef;
export declare type UseCallback = <T extends ((...args: any[]) => any)>(callback: T, args: any[]) => T;
export declare const useCallback: UseCallback;
export declare type UseMemo = <T>(fn: Function, args: any[]) => T;
export declare const useMemo: UseMemo;
