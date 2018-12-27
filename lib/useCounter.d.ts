export interface CounterActions {
    inc: (delta?: number) => void;
    dec: (delta?: number) => void;
    get: () => number;
    set: (value: number) => void;
    reset: (value?: number) => void;
}
declare const useCounter: (initialValue?: number) => [number, CounterActions];
export default useCounter;
