import 'jest-localstorage-mock';

(window as any).ResizeObserver = class ResizeObserver {
  observe() {}
  disconnect() {}
};

window['channels'] = {};
(window as any).BroadcastChannel = class BroadcastChannel {
  id: string;
  key: string;
  _onmessage: any[] = [];

  constructor(key: string) {
    this.key = key;
    this.id = Math.random().toString(32);
    window['channels'] = window['channels'] || {};
    window['channels'][key] = window['channels'][key] || [];
    window['channels'][key].push(this);
  }

  set onmessage(fn: any) {
    this._onmessage.push(fn);
  }

  get onmessage() {
    return this._onmessage;
  }

  postMessage(message: string) {
    const channels = window['channels'][this.key] || [];
    channels.forEach((channel) => {
      channel.onmessage.forEach((handler) => {
        handler({ data: message });
      });
    });
  }
};
