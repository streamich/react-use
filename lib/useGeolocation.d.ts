export interface GeoLocationSensorState {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
    timestamp: number;
}
declare const useGeolocation: () => {
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
