import {useRef,useState,useCallback,useEffect} from 'react';


const ONE_HOUR = 1000 * 60 * 60;


const wakeLockSupported = 'wakeLock' in navigator;


interface UseWakeLockParams {
  lockOnLoad?:boolean;
  lockOnVisible?: boolean;
  timeOut?:number;
}

enum LOCK_STATUS {
  STATUS_INITIAL = 'initial',
  STATUS_ACQUIRED='acquired',
  STATUS_FAILED='failed'
}

type UseWakeLockReturnType = [LOCK_STATUS, string, Function, Function];

const NO_SUPPORT = "Wakelock is not supported in this browser";

const useWakeLock = ({
  lockOnLoad = false,
  timeOut = ONE_HOUR,
  lockOnVisible = false
}:UseWakeLockParams = {}):UseWakeLockReturnType => {
  const wakeLock = useRef<WakeLockSentinel>();
  const timeOutHandle = useRef<number>();
  const [status, setStatus] = useState(LOCK_STATUS.STATUS_INITIAL);
  const [error, setError] = useState('');

  const releaseLock = async () => {
    await wakeLock.current?.release();
  };

  const requestLock = useCallback(async () => {
    try {
      wakeLock.current = await navigator.wakeLock.request("screen");
      setStatus(LOCK_STATUS.STATUS_ACQUIRED);
      wakeLock.current.addEventListener('release', () => {
        setStatus(LOCK_STATUS.STATUS_INITIAL);
      });
      timeOutHandle.current = window.setTimeout(() => {
        releaseLock();
      }, timeOut);
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
      await releaseLock();
      setStatus(LOCK_STATUS.STATUS_FAILED);
      setError(err.message);
    }
  }, [timeOut]);

  useEffect(() => {
    if(!wakeLockSupported){
      setStatus(LOCK_STATUS.STATUS_FAILED);
      setError(NO_SUPPORT);
      return;
    }
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

export default useWakeLock;