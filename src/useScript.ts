import {useEffect, useState} from 'react';

export interface LoadScriptOptions {
  id?: string;
  type?: string;
  async?: boolean;
  onload?: Function;
  onerror?: Function;
  onabort?: Function;
  crossOrigin?: string | null;
}

export function makeScript(url, options : LoadScriptOptions) {
  let element : HTMLScriptElement | null;
  let _ready = false;
  let _failed = false;
  const {
    type = "text/javascript",
    async = true,
    id,
    onload,
    onerror,
    onabort,
    crossOrigin = null
  } = options || {};
  function _onload() {
    _ready = true;
    onload && onload();
  }
  function _onerror(...args) {
    _failed = true;
    onerror && onerror(...args);
  }
  function _onabort(...args) {
    _failed = true;
    onabort && onabort(...args);
  }
  function load() {
    if (element) {
      return;
    }
    element = document.createElement("script");

    element.src = url;
    element.type = type;
    element.async = async;
    if (id) {
      element.id = id;
    }
    element.crossOrigin = crossOrigin;

    element.onload = _onload;
    element.onerror = _onerror;
    element.onabort = _onabort;
    document
      .head
      .appendChild(element);
  }

  function unload() {
    if (element) {
      document
        .head
        .removeChild(element);
      element = null;
      _ready = false;
      _failed = false;
    }
  }

  function useScript() {
    const [ready,
      setReady] = useState(_ready);
    const [failed,
      setFailed] = useState(_failed);
    useEffect(() => {
      load();

      if (element) {
        element.onload = () => {
          setReady(true);
          _onload();
        }
  
        element.onerror = (...args) => {
          setFailed(true);
          _onerror(...args);
        }
        element.onabort = (...args) => {
          setFailed(true);
          _onabort(...args);
        }
      }
    }, []);
    return {ready, failed};
  }

  useScript.load = load;
  useScript.unload = unload;

  useScript.ready = _ready;
  useScript.failed = _failed;
  Object.defineProperty(useScript, 'ready', {
    get() {
      return _ready;
    }
  })
  Object.defineProperty(useScript, 'failed', {
    get() {
      return _failed;
    }
  })

  return useScript;
}

const useScript = (url : string, options?: LoadScriptOptions) : {
  ready: boolean,
  failed: boolean
} => {
  const [ready,
    setReady] = useState(false);
  const [failed,
    setFailed] = useState(false);
  const {
    type = "text/javascript",
    async = true,
    id,
    onload,
    onerror,
    onabort
  } = options || {};
  useEffect(() => {
    const script = makeScript(url, {
      type,
      async,
      id,
      onload: () => {
        setReady(true);
        onload && onload();
      },
      onerror: (...args) => {
        setFailed(true);
        onerror && onerror(...args);
      },
      onabort: (...args) => {
        setFailed(true);
        onabort && onabort(...args);
      }
    });
    script.load();
    return () => {
      script.unload();
      setReady(false);
      setFailed(false);
    };
  // we don't want callback make script reload
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, async, id, type]);

  return {ready, failed};
};

export default useScript;