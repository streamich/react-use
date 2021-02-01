import { renderHook } from '@testing-library/react-hooks';
import useFavicon from '../src/useFavicon';

afterEach(() => {
  const favicon = document.querySelector("link[rel*='icon']");
  if (favicon) {
    favicon.remove();
  }
});

describe('useFavicon', () => {
  it('should be defined', () => {
    expect(useFavicon).toBeDefined();
  });

  it('should create a HTMLLinkElement', () => {
    const faviconBeforeHook = document.querySelector("link[rel*='icon']");

    expect(faviconBeforeHook).toBe(null);
    renderHook(() => useFavicon('My-favicon'));

    const faviconAfterHook = document.querySelector("link[rel*='icon']");
    expect(faviconAfterHook).toBeInstanceOf(HTMLLinkElement);
  });

  it('should set the elements type to "image/x-icon"', () => {
    renderHook(() => useFavicon('My-favicon'));
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    expect(favicon.type).toBe('image/x-icon');
  });

  it('should set the elements rel to "shortcut icon"', () => {
    renderHook(() => useFavicon('My-favicon'));
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    expect(favicon.rel).toBe('shortcut icon');
  });

  it('should set the elements href to the provided string', () => {
    renderHook(() => useFavicon('https://github.com/streamich/react-use'));
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    expect(favicon.href).toBe('https://github.com/streamich/react-use');
  });

  it('should update an existing favicon', () => {
    const hook = renderHook((props) => useFavicon(props), {
      initialProps: 'https://github.com/streamich/react-use',
    });
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    expect(favicon.href).toBe('https://github.com/streamich/react-use');
    hook.rerender('https://en.wikipedia.org/wiki/Favicon');
    expect(favicon.href).toBe('https://en.wikipedia.org/wiki/Favicon');
  });
});
