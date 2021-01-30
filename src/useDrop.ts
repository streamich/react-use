import { useCallback, useEffect, useMemo, useState } from 'react';
import { noop, off, on } from './misc/util';

export interface DropAreaState {
  over: boolean;
}

export interface DropAreaBond {
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  onPaste: React.ClipboardEventHandler;
}

export interface DropAreaOptions {
  onFiles?: (files: File[], event?) => void;
  onText?: (text: string, event?) => void;
  onUri?: (url: string, event?) => void;
}

const createProcess = (options: DropAreaOptions) => (dataTransfer: DataTransfer, event) => {
  const uri = dataTransfer.getData('text/uri-list');

  if (uri) {
    (options.onUri || noop)(uri, event);
    return;
  }

  if (dataTransfer.files && dataTransfer.files.length) {
    (options.onFiles || noop)(Array.from(dataTransfer.files), event);
    return;
  }

  if (event.clipboardData) {
    const text = event.clipboardData.getData('text');
    (options.onText || noop)(text, event);
    return;
  }
};

const useDrop = (options: DropAreaOptions = {}, args = []): DropAreaState => {
  const { onFiles, onText, onUri } = options;
  const [over, setOverRaw] = useState<boolean>(false);
  const setOver = useCallback(setOverRaw, []);
  const process = useMemo(() => createProcess(options), [onFiles, onText, onUri]);

  useEffect(() => {
    const onDragOver = (event) => {
      event.preventDefault();
      setOver(true);
    };

    const onDragEnter = (event) => {
      event.preventDefault();
      setOver(true);
    };

    const onDragLeave = () => {
      setOver(false);
    };

    const onDragExit = () => {
      setOver(false);
    };

    const onDrop = (event) => {
      event.preventDefault();
      setOver(false);
      process(event.dataTransfer, event);
    };

    const onPaste = (event) => {
      process(event.clipboardData, event);
    };

    on(document, 'dragover', onDragOver);
    on(document, 'dragenter', onDragEnter);
    on(document, 'dragleave', onDragLeave);
    on(document, 'dragexit', onDragExit);
    on(document, 'drop', onDrop);
    if (onText) {
      on(document, 'paste', onPaste);
    }

    return () => {
      off(document, 'dragover', onDragOver);
      off(document, 'dragenter', onDragEnter);
      off(document, 'dragleave', onDragLeave);
      off(document, 'dragexit', onDragExit);
      off(document, 'drop', onDrop);
      off(document, 'paste', onPaste);
    };
  }, [process, ...args]);

  return { over };
};

export default useDrop;
