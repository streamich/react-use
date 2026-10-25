import { renderHook } from '@testing-library/react-hooks';
import useFavicon from '../src/useFavicon';

afterEach(() => {
  document.querySelectorAll("link[rel*='icon']").forEach((link) => link.remove());
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

  it.each(['apple-touch-icon', 'mask-icon'])(
    'should leave %s links unchanged when creating a favicon',
    (rel) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = 'https://example.com/special-icon.png';
      document.head.appendChild(link);

      renderHook(() => useFavicon('https://example.com/favicon.ico'));

      expect(link.rel).toBe(rel);
      expect(link.href).toBe('https://example.com/special-icon.png');
      expect(document.querySelector<HTMLLinkElement>('link[rel~="icon"]')!.href).toBe(
        'https://example.com/favicon.ico'
      );
    }
  );

  it.each(['icon', 'shortcut icon'])(
    'should find an existing %s link after an Apple touch icon',
    (rel) => {
      const touchIcon = document.createElement('link');
      touchIcon.rel = 'apple-touch-icon';
      touchIcon.href = 'https://example.com/touch.png';
      const favicon = document.createElement('link');
      favicon.rel = rel;
      favicon.href = 'https://example.com/old.ico';
      document.head.appendChild(touchIcon);
      document.head.appendChild(favicon);

      renderHook(() => useFavicon('https://example.com/new.ico'));

      expect(favicon.href).toBe('https://example.com/new.ico');
      expect(touchIcon.href).toBe('https://example.com/touch.png');
      expect(touchIcon.rel).toBe('apple-touch-icon');
      expect(document.querySelectorAll('link[rel~="icon"]')).toHaveLength(1);
    }
  );
});
