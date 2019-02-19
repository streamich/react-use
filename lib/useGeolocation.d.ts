export interface GeoLocationSensorState {
    loading: boolean;
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
    timestamp: number;
    error?: Error | PositionError;
}
declare const useGeolocation: () => {
    loading: boolean;
    accuracy: null;
    altitude: null;
    altitudeAccuracy: null;
    heading: null;
    latitude: null;
    longitude: null;
    speed: null;
    timestamp: number;
};
export default useGeolocation;
