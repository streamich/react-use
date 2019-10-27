import { act, renderHook } from '@testing-library/react-hooks';
import useMeasure, { ContentRect } from '../src/useMeasure';

interface Entry {
  target: HTMLElement;
  contentRect: ContentRect;
}

jest.mock('resize-observer-polyfill', () => {
  return class ResizeObserver {
    private cb: (entries: Entry[]) => void;
    private map: WeakMap<HTMLElement, any>;
    private targets: HTMLElement[];
    constructor(cb: () => void) {
      this.cb = cb;
      this.map = new WeakMap();
      this.targets = [];
    }
    public disconnect() {
      this.targets.map(target => {
        const originMethod = this.map.get(target);
        target.setAttribute = originMethod;
        this.map.delete(target);
      });
    }
    public observe(target: HTMLElement) {
      const method = 'setAttribute';
      const originMethod = target[method];
      this.map.set(target, originMethod);
      this.targets.push(target);
      target[method] = (...args) => {
        const [attrName, value] = args;
        if (attrName === 'style') {
          const rect: ContentRect = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
          value.split(';').map(kv => {
            const [key, v] = kv.split(':');
            if (['top', 'bottom', 'left', 'right', 'width', 'height'].includes(key)) {
              rect[key] = parseInt(v, 10);
            }
          });
          target.getBoundingClientRect = () => rect;
        }
        originMethod.apply(target, args);
        this.fireCallback();
      };
    }
    private fireCallback() {
      if (this.cb) {
        this.cb(
          this.targets.map(target => {
            return {
              target,
              contentRect: target.getBoundingClientRect(),
            };
          })
        );
      }
    }
  };
});

it('reacts to changes in size of any of the observed elements', () => {
  const { result } = renderHook(() => useMeasure());
  const div = document.createElement('div');
  result.current[0](div);
  expect(result.current[1]).toMatchObject({
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  act(() => div.setAttribute('style', 'width:200px;height:200px;top:100;left:100'));

  expect(result.current[1]).toMatchObject({
    width: 200,
    height: 200,
    top: 100,
    bottom: 0,
    left: 100,
    right: 0,
  });
});
