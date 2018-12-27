export declare type AsyncState<T> = {
    loading: true;
    error?: undefined;
    value?: undefined;
} | {
    loading: false;
    error: Error;
    value?: undefined;
} | {
    loading: false;
    error?: undefined;
    value: T;
};
declare const useAsync: <T>(fn: () => Promise<T>, args?: any) => AsyncState<T>;
export default useAsync;
