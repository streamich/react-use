import { MutableRefObject, useMemo, useRef, useState } from 'react';
import useMountedState from './useMountedState';
import { noop } from './misc/util';

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

/*
const defaultState: DropAreaState = {
  over: false,
};
*/

const createProcess =
  (options: DropAreaOptions, mounted: boolean) => (dataTransfer: DataTransfer, event) => {
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
        if (mounted) {
          (options.onText || noop)(text, event);
        }
      });
    }
  };

const createBond = (process, setOver, dragDepth: MutableRefObject<number>): DropAreaBond => ({
  onDragOver: (event) => {
    event.preventDefault();
  },
  onDragEnter: (event) => {
    event.preventDefault();
    dragDepth.current += 1;
    setOver(true);
  },
  onDragLeave: () => {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) {
      setOver(false);
    }
  },
  onDrop: (event) => {
    event.preventDefault();
    event.persist();
    dragDepth.current = 0;
    setOver(false);
    process(event.dataTransfer, event);
  },
  onPaste: (event) => {
    event.persist();
    process(event.clipboardData, event);
  },
});

const useDropArea = (options: DropAreaOptions = {}): [DropAreaBond, DropAreaState] => {
  const { onFiles, onText, onUri } = options;
  const isMounted = useMountedState();
  const [over, setOver] = useState<boolean>(false);
  const dragDepth = useRef(0);
  const process = useMemo(() => createProcess(options, isMounted()), [onFiles, onText, onUri]);
  const bond: DropAreaBond = useMemo(
    () => createBond(process, setOver, dragDepth),
    [process, setOver]
  );

  return [bond, { over }];
};

export default useDropArea;
