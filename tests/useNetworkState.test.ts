import { renderHook } from '@testing-library/react-hooks';
import { useNetworkState } from '../src';

// TODO: Add comprehensive tests for network state changes, offline/online events, and network information properties
describe(`useNetworkState`, () => {
  it('should be defined', () => {
    expect(useNetworkState).toBeDefined();
  });

  it('should return an object of certain structure', () => {
    const hook = renderHook(() => useNetworkState(), { initialProps: false });

    expect(typeof hook.result.current).toEqual('object');
    expect(Object.keys(hook.result.current)).toEqual([
      'online',
      'previous',
      'since',
      'downlink',
      'downlinkMax',
      'effectiveType',
      'rtt',
      'saveData',
      'type',
    ]);
  });
});
