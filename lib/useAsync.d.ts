export interface AsyncState<T> {
    loading: boolean;
    error?: Error | any;
    value?: T;
}
declare const useAsync: <T>(fn: () => Promise<T>, args?: any) => AsyncState<T>;
export default useAsync;
