import React, { useRef, useEffect } from 'react';
import { render, fireEvent, createEvent, act, screen, waitFor } from '@testing-library/react';
import { useScrollStepSize } from '../src';
import { replaceRaf } from 'raf-stub';

interface ItemScrollProps {
  index: number;
}

declare let requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

const createWheelEvent = (container: HTMLElement, type: 'up' | 'down'): Event => {
  const deltaY = type === 'down' ? 53 : -53;
  return createEvent.wheel(container, { deltaX: -0, deltaY });
}

const wheelUpEvent = (container: HTMLElement): Event => createWheelEvent(container, 'up')
const wheelDownEvent = (container: HTMLElement): Event => createWheelEvent(container, 'down')

type SutTypes = {
  itemHeight: number
}

const makeSut = (itemHeight: number = 40): SutTypes => {
  const App = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [scrollTop] = useScrollStepSize(ref, itemHeight);

    useEffect(() => {
      if (ref.current) {
        Object.defineProperties(ref.current, {
          scrollHeight: {
            value: 4200,
          },
          clientHeight: {
            value: 210,
          },
        });
        const childrenArray = Array.prototype.slice.call(ref.current.children)
        childrenArray.forEach(c => {
          Object.defineProperties(c, {
            clientHeight: {
              value: itemHeight || 40
            }
          });
        })
      }
    }, [ref]);

    const ItemScroll: React.FC<ItemScrollProps> = React.memo(({ index, ...props }) => {
      return (
        <div style={{ height: '40px', border: '1px solid red', boxSizing: 'border-box' }} {...props}>
          Item {index}
        </div>
      );
    });

    return (
      <>
        <label data-testid="currentValueScrollTop">{scrollTop}</label>
        <div data-testid="scrollContainer" ref={ref} style={{ height: '210px', overflow: 'auto' }}>
          {new Array(100).fill(0).map((i, idx) => {
            return <ItemScroll key={`${idx}-${i}`} index={idx} />;
          })}
        </div>
      </>
    );
  };

  render(<App />)

  return {
    itemHeight
  }
}

describe('useScrollStepSize with fixed item height', () => {
  replaceRaf();

  beforeEach(() => {
    requestAnimationFrame.reset();
  });

  it('Should be defined', () => {
    expect(useScrollStepSize).toBeDefined();
  });

  it('Should render without error', async () => {
    makeSut()

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');

    expect(currentValueScrollTop.textContent).toBe('0');
  });

  it('Should increment scrollTop on wheel down', async () => {
    const { itemHeight } = makeSut()

    const scrollContainer = screen.getByTestId('scrollContainer');

    act(() => {
      fireEvent(scrollContainer, wheelDownEvent(scrollContainer));
      requestAnimationFrame.step();
    });

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');
    expect(currentValueScrollTop.textContent).toBe((0 + itemHeight).toString());
  });

  it('Should decrement scrollTop on wheel up', async () => {
    makeSut()

    let scrollTopOnWheelDownEvent;
    let scrollTopOnWheelUpEvent;

    const scrollContainer = screen.getByTestId('scrollContainer');
    act(() => {
      fireEvent(scrollContainer, wheelDownEvent(scrollContainer));
      requestAnimationFrame.step();
    });
    scrollTopOnWheelDownEvent = Number(screen.getByTestId('currentValueScrollTop').textContent)

    act(() => {
      fireEvent(scrollContainer, wheelUpEvent(scrollContainer));
      requestAnimationFrame.step();
    });
    scrollTopOnWheelUpEvent = Number(screen.getByTestId('currentValueScrollTop').textContent)

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');

    expect(scrollTopOnWheelDownEvent).toBeGreaterThan(scrollTopOnWheelUpEvent);
    expect(currentValueScrollTop.textContent).toBe('0');
  });

  it('Should not set scrollTop to be less than 0', async () => {
    makeSut()

    const scrollContainer = screen.getByTestId('scrollContainer');

    act(() => {
      fireEvent(scrollContainer, wheelUpEvent(scrollContainer));
      requestAnimationFrame.step();
    });

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');

    expect(Number(currentValueScrollTop.textContent)).not.toBeLessThan(0);
  });

  it('Should not set scrollTop to be greater than DOM element scrollHeight', async () => {
    makeSut()

    const scrollContainer = screen.getByTestId('scrollContainer');

    act(() => {
      fireEvent(scrollContainer, wheelUpEvent(scrollContainer));
      requestAnimationFrame.step();
    });

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');

    expect(Number(currentValueScrollTop.textContent)).not.toBeLessThan(0);
  });
});

describe('useScrollStepSize dynamic', () => {
  replaceRaf();

  beforeEach(() => {
    requestAnimationFrame.reset();
  });

  it('Should be defined', () => {
    expect(useScrollStepSize).toBeDefined();
  });

  it('Should render without error', async () => {
    makeSut(0)

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');

    expect(currentValueScrollTop.textContent).toBe('0');
  });

  it('Should increment scrollTop on wheel down', async () => {
    makeSut(0)

    const scrollContainer = screen.getByTestId('scrollContainer');

    act(() => {
      fireEvent(scrollContainer, wheelDownEvent(scrollContainer));
      requestAnimationFrame.step();
    });

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');
    expect(Number(currentValueScrollTop.textContent)).toBeGreaterThan(0);
    expect(Number(currentValueScrollTop.textContent)).toBeGreaterThan(0);
  });

  it('Should decrement scrollTop on wheel up', async () => {
    makeSut(0)

    let scrollTopOnWheelDownEvent;
    let scrollTopOnWheelUpEvent;

    const scrollContainer = screen.getByTestId('scrollContainer');

    act(() => {
      fireEvent(scrollContainer, wheelDownEvent(scrollContainer));
      requestAnimationFrame.step();
    });
    let currentScrollTop = await waitFor<HTMLElement>(() => screen.getByTestId('currentValueScrollTop'))
    scrollTopOnWheelDownEvent = Number(currentScrollTop.textContent)
    console.log('scrollTopOnWheelDownEvent', scrollTopOnWheelDownEvent)

    act(() => {
      fireEvent(scrollContainer, wheelUpEvent(scrollContainer));
      requestAnimationFrame.step();
    });
    currentScrollTop = await waitFor<HTMLElement>(() => screen.getByTestId('currentValueScrollTop'))
    scrollTopOnWheelUpEvent = Number(currentScrollTop.textContent)
    console.log('scrollTopOnWheelUpEvent', scrollTopOnWheelUpEvent)

    expect(scrollTopOnWheelDownEvent).toBeGreaterThan(scrollTopOnWheelUpEvent);
    expect(currentScrollTop.textContent).toBe('0');
  });

  it('Should not set scrollTop to be less than 0', async () => {
    makeSut();

    const scrollContainer = screen.getByTestId('scrollContainer');

    act(() => {
      fireEvent(scrollContainer, wheelUpEvent(scrollContainer));
      requestAnimationFrame.step();
    });

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');

    expect(Number(currentValueScrollTop.textContent)).not.toBeLessThan(0);
  });

  it('Should not set scrollTop to be greater than DOM element scrollHeight', async () => {
    makeSut();

    const scrollContainer = screen.getByTestId('scrollContainer');

    act(() => {
      fireEvent(scrollContainer, wheelUpEvent(scrollContainer));
      requestAnimationFrame.step();
    });

    const currentValueScrollTop = screen.getByTestId('currentValueScrollTop');

    expect(Number(currentValueScrollTop.textContent)).not.toBeLessThan(0);
  });
});
