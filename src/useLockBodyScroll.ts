import { useEffect } from 'react';

let counter = 0;
let originalOverflow: string | null = null;

const lock = () => {
  originalOverflow = window.getComputedStyle(document.body).overflow;
  document.body.style.overflow = 'hidden';
};

const unlock = () => {
  document.body.style.overflow = originalOverflow;
  originalOverflow = null;
};

const increment = () => {
  counter++;
  if (counter === 1) {
    lock();
  }
};

const decrement = () => {
  counter--;
  if (counter === 0) {
    unlock();
  }
};

const useLockBodyScroll = (enabled: boolean = true) => {
  useEffect(() => (enabled ? (increment(), decrement) : undefined), [enabled]);
};

export default useLockBodyScroll;
