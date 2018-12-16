import {useEffect} from 'react';
import useLifecycles from './useLifecycles';

const useLogger = (name, props) => {
  useLifecycles(() => console.log(`${name} mounted`), () => console.log(`${name} un-mounted`));
  useEffect(() => {
    console.log(`${name} props updated`, props);
  });
};

export default useLogger;
