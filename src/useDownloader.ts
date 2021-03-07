import { useCallback, useMemo, useRef, useState } from 'react';

export const resolver = ({
  setSize,
  setControllerCallback,
  setPercentageCallback,
  setErrorCallback,
}) => (response) => {
  if (!response.ok) {
    throw Error(`${response.status} ${response.type} ${response.statusText}`);
  }

  if (!response.body) {
    throw Error('ReadableStream not yet supported in this browser.');
  }

  const contentEncoding = response.headers.get('content-encoding');
  const contentLength = response.headers.get(contentEncoding ? 'x-file-size' : 'content-length');

  const total = parseInt(contentLength || 0, 10);

  setSize(() => total);

  let loaded = 0;

  const stream = new ReadableStream({
    start(controller) {
      setControllerCallback(controller);

      const reader = response.body.getReader();

      function read() {
        return reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              return controller.close();
            }

            loaded += value.byteLength;

            controller.enqueue(value);

            setPercentageCallback({ loaded, total });

            return read();
          })
          .catch((error) => {
            setErrorCallback(error);
            reader.cancel('Cancelled');
            return controller.error(error);
          });
      }

      return read();
    },
  });

  return new Response(stream);
};

function jsDownload(data: Blob, filename: string, mime?: string) {
  const blobData = [data];
  const blob = new Blob(blobData, {
    type: mime || 'application/octet-stream',
  });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const blobURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    setTimeout(() => {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 200);
  }
}

type TUseDownloader = {
  elapsed: number;
  percentage: number;
  size: number;
  download: (downloadUrl: any, filename: any) => void;
  cancel: () => void;
  error: { errorMessage: string } | null;
  isInProgress: boolean;
};

export default function useDownloader(): TUseDownloader {
  const debugMode = process.env.REACT_APP_DEBUG_MODE;

  const [elapsed, setElapsed] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [size, setSize] = useState(0);
  const [error, setError] = useState<{ errorMessage: string } | null>(null);
  const [isInProgress, setIsInProgress] = useState(false);

  const controllerRef = useRef<any | null>(null);

  const setPercentageCallback = useCallback(({ loaded, total }) => {
    const pct = Math.round((loaded / total) * 100);

    setPercentage(() => pct);
  }, []);

  const setErrorCallback = useCallback((err) => {
    const errorMap = {
      "Failed to execute 'enqueue' on 'ReadableStreamDefaultController': Cannot enqueue a chunk into an errored readable stream":
        'Download canceled',
    };
    setError(() => {
      const resolvedError = errorMap[err.message] ? errorMap[err.message] : err.message;

      return { errorMessage: resolvedError };
    });
  }, []);

  const setControllerCallback = useCallback((controller) => {
    controllerRef.current = controller;
  }, []);

  const closeControllerCallback = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.error();
    }
  }, []);

  const clearAllStateCallback = useCallback(() => {
    setControllerCallback(null);

    setElapsed(() => 0);
    setPercentage(() => 0);
    setSize(() => 0);
    setIsInProgress(() => false);
  }, [setControllerCallback]);

  const handleDownload = useCallback(
    (downloadUrl, filename) => {
      function startDownload() {
        clearAllStateCallback();
        setError(() => null);
        setIsInProgress(() => true);

        const interval = setInterval(
          () => setElapsed((prevValue) => prevValue + 1),
          debugMode ? 1 : 1000
        );
        const resolverWithProgress = resolver({
          setSize,
          setControllerCallback,
          setPercentageCallback,
          setErrorCallback,
        });

        return fetch(downloadUrl, {
          method: 'GET',
        })
          .then(resolverWithProgress)
          .then((data) => data.blob())
          .then((response) => jsDownload(response, filename))
          .finally(() => {
            clearAllStateCallback();

            return clearInterval(interval);
          })
          .catch((err) => {
            clearAllStateCallback();
            setError((prevValue) => {
              const { message } = err;

              if (message !== 'Failed to fetch') {
                return {
                  errorMessage: err.message,
                };
              }

              return prevValue;
            });
          });
      }

      if (!isInProgress) {
        startDownload();
      }
    },
    [
      isInProgress,
      clearAllStateCallback,
      debugMode,
      setControllerCallback,
      setPercentageCallback,
      setErrorCallback,
    ]
  );

  return useMemo(
    () => ({
      elapsed,
      percentage,
      size,
      download: handleDownload,
      cancel: closeControllerCallback,
      error,
      isInProgress,
    }),
    [elapsed, percentage, size, handleDownload, closeControllerCallback, error, isInProgress]
  );
}
