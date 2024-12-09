import { renderHook } from '@testing-library/react-hooks';
import useLanguage from '../src/useLanguage';

describe('useLanguage', () => {
  it('should be defined', () => {
    expect(useLanguage).toBeDefined();
  });

  it('should retrieve the document language', () => {
    document.documentElement.lang = 'ar-SA';
    const hook = renderHook(() => useLanguage());

    expect(document.documentElement.lang).toBe(hook.result.current[0]);
  });

  it('should update document language', () => {
    const hook = renderHook(() => useLanguage());

    hook.result.current[1]('bn-BD');
    expect(document.documentElement.lang).toBe('bn-BD');

    hook.result.current[1]('bn-IN');
    expect(document.documentElement.lang).toBe('bn-IN');
  });
});
