export class Subscription {
  // properties
  private _listeners: Set<() => void>;
  // constructor
  constructor() {
    this._listeners = new Set();
  }
  // getter
  protected get listeners() {
    return this._listeners;
  }
  // methods
  subscribe = (listener: () => void) => {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  };
}
