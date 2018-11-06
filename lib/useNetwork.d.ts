export interface NetworkState {
    online?: boolean;
    since?: Date;
    downlink?: number;
    downlinkMax?: number;
    effectiveType?: string;
    rtt?: number;
    type?: string;
}
declare const useNetwork: (initialState?: NetworkState) => NetworkState;
export default useNetwork;
