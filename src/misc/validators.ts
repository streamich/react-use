import { RefObject } from 'react';

export function validateRefArgument(fn: Function, ref: RefObject<unknown>): void {
  if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
    console.error(`\`${fn.name}\` expects a single ref argument.`);
  }
}
