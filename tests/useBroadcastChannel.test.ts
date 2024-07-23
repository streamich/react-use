import { renderHook, act } from '@testing-library/react-hooks';
import { useBroadcastChannel, UseBroadcastChannelReturns } from '../src/useBroadcastChannel';

class MockBroadcastChannel {
  private listeners: { [key: string]: (event: MessageEvent) => void } = {};

  addEventListener(eventType: string, listener: (event: MessageEvent) => void) {
    this.listeners[eventType] = listener;
  }

  postMessage(data: any) {
    const event = { data } as MessageEvent;
    if (this.listeners['message']) {
      this.listeners['message'](event);
    }
  }

  close() {
    if (this.listeners['close']) {
      this.listeners['close']({} as MessageEvent);
    }
  }
}

describe('useBroadcastChannel', () => {
  let mockChannel: MockBroadcastChannel;

  beforeEach(() => {
    mockChannel = new MockBroadcastChannel();

    (window as any).BroadcastChannel = jest.fn().mockImplementation(() => {
      return mockChannel;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if BroadcastChannel is not supported', () => {
    delete (window as any).BroadcastChannel;

    const { result } = renderHook(() => useBroadcastChannel({ name: 'test-channel' }));

    expect(result.error).toEqual(new Error('BroadcastChannel is not supported'));
  });

  it('should create a BroadcastChannel and receive messages', () => {
    const mockData = { message: 'Hello' };

    const { result } = renderHook<UseBroadcastChannelReturns<any>, any>(() =>
      useBroadcastChannel({ name: 'test-channel' })
    );

    act(() => {
      const { send } = result.current;
      send(mockData);
    });

    expect(result.current.receive).toEqual(mockData);
  });

  it('should close the channel', () => {
    const { result } = renderHook<UseBroadcastChannelReturns<any>, any>(() =>
      useBroadcastChannel({ name: 'test-channel' })
    );

    act(() => {
      const { close } = result.current;
      close();
    });

    expect(result.current.isClosed).toBe(true);
  });
});
