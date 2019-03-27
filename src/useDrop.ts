import * as React from 'react';
import useRefMounted from './useRefMounted';

const {useState, useMemo, useCallback, useEffect} = React;

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

const noop = () => {};
const defaultState: DropAreaState = {
  over: false,
};

const createProcess = (options: DropAreaOptions, mounted: React.RefObject<boolean>) => (
  dataTransfer: DataTransfer,
  event,
) => {
  const uri = dataTransfer.getData('text/uri-list');

  if (uri) {
    (options.onUri || noop)(uri, event);
    return;
  }

  if (dataTransfer.files && dataTransfer.files.length) {
    (options.onFiles || noop)(Array.from(dataTransfer.files), event);
    return;
  }

  if (dataTransfer.items && dataTransfer.items.length) {
    dataTransfer.items[0].getAsString((text) => {
      if (mounted.current) {
        (options.onText || noop)(text, event);
      }
    });
  }
};

const useDrop = (options: DropAreaOptions = {}): DropAreaState => {
  const {onFiles, onText, onUri} = options;
  const mounted = useRefMounted();
  const [over, setOverRaw] = useState<boolean>(false);
  const setOver = useCallback(setOverRaw, []);
  const process = useMemo(() => createProcess(options, mounted), [onFiles, onText, onUri]);

  useEffect(() => {
    const onDragOver = (event) => {
      event.preventDefault();
    };

    const onDragEnter = (event) => {
      event.preventDefault();
      setOver(true);
    };

    const onDragLeave = () => {
      setOver(true);
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

    window.addEventListener('dragover', onDragOver);
    window.addEventListener('dragenter', onDragEnter);
    window.addEventListener('dragleave', onDragLeave);
    window.addEventListener('dragexit', onDragExit);
    window.addEventListener('drop', onDrop);

    if (onText) {
      window.addEventListener('paste', onPaste);
    }

    return () => {
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('dragexit', onDragExit);
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('paste', onPaste);
    };
  }, [process]);

  return {over};
};

export default useDrop;
