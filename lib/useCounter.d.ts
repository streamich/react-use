export declare type Increment = (inc?: number) => void;
export declare type Set = (value: number) => void;
declare const useCounter: (initialValue?: number) => [number, Increment, Set];
export default useCounter;
