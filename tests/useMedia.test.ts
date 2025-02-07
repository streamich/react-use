import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { useMedia } from '../src';

const createMockMediaMatcher = (matches: Record<string, boolean>) => (qs: string) => ({
  matches: matches[qs] ?? false,
  addEventListener: () => {},
  removeEventListener: () => {},
});

describe('useMedia', () => {
  beforeEach(() => {
    window.matchMedia = createMockMediaMatcher({
      '(min-width: 500px)': true,
      '(min-width: 1000px)': false,
    }) as any;
  });
  it('should return true if media query matches', () => {
    const { result } = renderHook(() => useMedia('(min-width: 500px)'), { hydrate: true });
    expect(result.current).toBe(true);
  });
  it('should return false if media query does not match', () => {
    const { result } = renderHook(() => useMedia('(min-width: 1200px)'), { hydrate: true });
    expect(result.current).toBe(false);
  });
  it('should return default state before hydration', () => {
    const Component = () => {
      return React.createElement(
        React.Fragment,
        null,
        String(useMedia('(min-width: 500px)', false))
      );
    };
    const html = renderToString(React.createElement(Component));
    expect(html).toBe('false');
  });
  it('should return media query result after hydration', async () => {
    const { result } = renderHook(() => useMedia('(min-width: 500px)', false), { hydrate: true });
    expect(result.current).toBe(true);
  });
  it('should return media query result after hydration', async () => {
    const { result } = renderHook(() => useMedia('(min-width: 1200px)', true), { hydrate: true });
    expect(result.current).toBe(false);
  });
});
