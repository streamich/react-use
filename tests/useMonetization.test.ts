import {renderHook} from '@testing-library/react-hooks';
import {useMonetization} from '../src';

describe('useTitle', () => {
  it('should be defined', () => {
    expect(useMonetization()).toBeDefined();
  });

  it('should update monetization wallet and remove it after', () => {
    const {result} = renderHook(() => useMonetization(),);
    result.current.setWallet('test_address');
    const tag: (Element & { content: string; name: string }) | null = document.querySelector('meta[name="monetization"]');
    expect(tag?.content).toBe('test_address');
    result.current.removeWallet();
    const emptyTag: (Element & { content: string; name: string }) | null = document.querySelector('meta[name="monetization"]');
    expect(emptyTag).toBe(null);
  });

});
