import {useEffect} from "react";

const useBeforeUnload = (message?: string) => {
  useEffect(() => {
    window.onbeforeunload = e => {
      e.returnValue = message;
      return message;
    };

    return () => {
      window.onbeforeunload = null;
      return;
    }
  }, [message]);
};

export default useBeforeUnload;