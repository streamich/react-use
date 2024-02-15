import { objectIs } from '../../misc/util';
import { Subscription } from './subscription';
import type { SetStateAction } from 'react';

export class SharedState<S> extends Subscription {
  // properties
  private _memoizedState: S;
  // constructor
  constructor(initialState: S | (() => S)) {
    super();
    this._memoizedState =
      typeof initialState === 'function' ? (initialState as () => S)() : initialState;
  }
  // methods
  getState = <Selection>(selector: (state: S) => Selection) => {
    return selector(this._memoizedState);
  };
  setState = (action: SetStateAction<S>) => {
    if (typeof action === 'function') {
      action = (action as (prevState: S) => S)(this._memoizedState);
    }
    if (objectIs(action, this._memoizedState)) {
      return;
    }
    this._memoizedState = action;
    this.listeners.forEach((listener) => listener());
  };
}
