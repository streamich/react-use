import {useEffect} from "react";

const useBeforeUnload = (message?: string) => {
  useEffect(() => {
    const beforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = message || "";
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [message]);
};

export default useBeforeUnload;