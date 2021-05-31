import {useRef,useState,useCallback,useEffect} from 'react';
import { noop } from './misc/util';


const STATUS_INITIAL = 'initial';
const STATUS_ACQUIRED = 'acquired';
const STATUS_FAILED = 'failed';
const ONE_HOUR = 1000 * 60 * 60;


const wakeLockSupported = 'wakeLock' in navigator;

const useWakeLock = ({
  lockOnLoad = false,
  timeout = ONE_HOUR,
  lockOnVisible = false
} = {}) => {
  const wakeLock = useRef<WakeLockSentinel>();
  const timeOutHandle = useRef<number>();
  const [status, setStatus] = useState(STATUS_INITIAL);
  const [error, setError] = useState('');

  const releaseLock = async () => {
    await wakeLock.current?.release();
  };

  const requestLock = useCallback(async () => {
    try {
      wakeLock.current = await navigator.wakeLock.request("screen");
      setStatus(STATUS_ACQUIRED);
      wakeLock.current.addEventListener('release', () => {
        setStatus(STATUS_INITIAL);
      });
      timeOutHandle.current = window.setTimeout(() => {
        releaseLock();
      }, timeout);
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
      await releaseLock();
      setStatus(STATUS_FAILED);
      setError(err.message);
    }
  }, [timeout]);

  useEffect(() => {
    if (lockOnLoad) {
      requestLock();
    }

    const handleVisibilityChange = async () => {
      if (!wakeLock.current && document.visibilityState === 'visible') {
        await requestLock();
      }
    };

    if (lockOnVisible) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    return () => {
      wakeLock.current?.release();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeOutHandle.current);
    };
  }, [lockOnLoad, lockOnVisible, requestLock]);

  return [status, error, requestLock, releaseLock];
};

module.exports = wakeLockSupported ? useWakeLock : noop;