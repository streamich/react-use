import {useEffect, useState} from 'react';
import useEffectOnce from './useEffectOnce';

export interface LoadScriptOptions extends Partial < Pick < HTMLScriptElement,
'type' | 'async' | 'id' | 'crossOrigin' | 'charset' | 'defer' | 'integrity' | 'noModule' | 'nonce' | 'referrerPolicy' >> {
  onLoad?: (event : Event) => void;
  onError?: (event : ErrorEvent) => void;
  onAbort?: (event : UIEvent) => void;
}

export function makeScript(url, options : LoadScriptOptions) {
  let element : HTMLScriptElement;

  let _ready = false;
  let _failed = false;
  const {
    type = "text/javascript",
    async = true,
    id,
    crossOrigin = null,
    charset,
    defer = false,
    integrity,
    noModule = false,
    nonce,
    referrerPolicy,
    onLoad,
    onError,
    onAbort
  } = options || {};
  function _onLoad(e : Event) {
    _ready = true;
    onLoad && onLoad(e);
    unload();
  }
  function _onError(e : ErrorEvent) {
    _failed = true;
    onError && onError(e);
    unload();
  }
  function _onAbort(e : UIEvent) {
    _failed = true;
    onAbort && onAbort(e);
    unload();
  }
  function load() {
    if (element) {
      return;
    }
    element = document.createElement("script");

    if (id) {
      element.id = id;
    }
    element.src = url;
    element.type = type;
    element.async = async;
    element.charset = charset || element.charset;
    element.defer = defer;
    element.integrity = integrity || element.integrity;
    element.noModule = noModule;
    element.nonce = nonce;
    element.referrerPolicy = referrerPolicy || element.referrerPolicy;
    element.crossOrigin = crossOrigin;

    element.addEventListener('load', _onLoad);
    element.addEventListener('error', _onError);
    element.addEventListener('abort', _onAbort);
    document
      .head
      .appendChild(element);
  }

  function unload() {
    if (element) {
      element.removeEventListener('load', _onLoad);
      element.removeEventListener('error', _onError);
      element.removeEventListener('abort', _onAbort);
      element.remove();
    }
  }

  function useScript() {
    const [ready,
      setReady] = useState(_ready);
    const [failed,
      setFailed] = useState(_failed);
    useEffectOnce(() => {
      load();

      const onSuccess = () => {
        setReady(true);
      }
      const onFailed = () => {
        setFailed(true);
      }
      element.addEventListener('load', onSuccess);
      element.addEventListener('error', onFailed);
      element.addEventListener('abort', onFailed);

      return () => {
        element.removeEventListener('load', onSuccess);
        element.removeEventListener('error', onFailed);
        element.removeEventListener('abort', onFailed);
      }
    });
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
    type,
    async,
    id,
    crossOrigin,
    charset,
    defer,
    integrity,
    noModule,
    nonce,
    referrerPolicy,
    onLoad,
    onError,
    onAbort,
  } = options || {};
  useEffect(() => {
    const script = makeScript(url, {
      type,
      async,
      id,
      crossOrigin,
      charset,
      defer,
      integrity,
      noModule,
      nonce,
      referrerPolicy,
      onLoad: (e) => {
        setReady(true);
        if (onLoad) {
          onLoad(e)
        };
      },
      onError: (e) => {
        setFailed(true);
        if (onError) {
          onError(e);
        }
      },
      onAbort: (e) => {
        setFailed(true);
        if (onAbort) {
          onAbort(e);
        }
      },
    });
    script.load();
    return () => {
      script.unload();
      setReady(false);
      setFailed(false);
    };
    // we don't want callback make script reload
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    url,
    type,
    async,
    id,
    crossOrigin,
    charset,
    defer,
    integrity,
    noModule,
    nonce,
    referrerPolicy
  ]);

  return {ready, failed};
};

export default useScript;