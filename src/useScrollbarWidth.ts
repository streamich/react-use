import { useState, useEffect } from 'react';
import { isClient } from './util';

const getScrollbarWidth = () => {
  const measureElement = document.createElement('div');
  measureElement.style.visibility = 'hidden';
  measureElement.style.overflow = 'scroll'; // forcing scrollbar to appear
  measureElement.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  measureElement.style.position = 'absolute';
  measureElement.style.top = '-9999px';
  measureElement.style.opacity = '0';
  document.body.appendChild(measureElement);

  const scrollbarWidth = measureElement.offsetWidth - measureElement.clientWidth;
  document.body.removeChild(measureElement);

  return scrollbarWidth;
};

const useScrollbarWidth = () => {
  const [width, setWidth] = useState<number | undefined>();

  useEffect(() => {
    if (isClient) {
      setWidth(getScrollbarWidth());
    }
  }, []);

  return width;
};

export default useScrollbarWidth;
