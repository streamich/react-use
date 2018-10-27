import {useState, useEffect} from './react';

export interface GeoLocationSensorState {
  accuracy: number,
  altitude: number,
  altitudeAccuracy: number,
  heading: number,
  latitude: number,
  longitude: number,
  speed: number,
  timestamp: number
}

const useGeolocation = () => {
  const [state, setState] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  });
  let mounted = true;
  let watchId: any;

  const onEvent = (event: any) => {
    if (mounted) {
      setState({
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent);
    watchId = navigator.geolocation.watchPosition(onEvent);

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, [0]);

  return state;
};

export default useGeolocation;
