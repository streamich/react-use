import React, { useRef, useEffect } from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { useScrollStepSize } from '../src';
import { replaceRaf } from 'raf-stub';

interface ItemScrollProps {
  index: number;
}

declare let requestAnimationFrame: {
  reset: () => void;
  step: (steps?: number, duration?: number) => void;
};

const fireScroll = (scrollTop: number) => {
  act(() => {
    fireEvent.scroll(screen.getByTestId('scrollContainer'), { target: { scrollTop } });
    requestAnimationFrame.step();
  });
};

const getCurrentScrollTop = (): number => {
  return Number(screen.getByTestId('currentValueScrollTop').textContent)
}

type SutTypes = {
  itemHeight: number
}

const makeSut = (itemHeight: number = 40): SutTypes => {
  const ItemScroll: React.FC<ItemScrollProps> = React.memo(({ index, ...props }) => {
    return (
      <div
        data-testid={`item-${index}`}
        style={{ height: '40px', border: '1px solid red', boxSizing: 'border-box' }}
        {...props}
      >
        Item {index}
      </div>
    );
  });

  const items = new Array(2).fill(0).map((i, idx) => {
    return <ItemScroll key={`${idx}-${i}`} index={idx} />;
  });

  const App = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [scrollTop] = useScrollStepSize(ref, itemHeight);

    useEffect(() => {
      if (ref.current) {
        Object.defineProperties(ref.current, {
          scrollHeight: {
            value: 80,
          },
          offsetHeight: {
            value: 80,
          },
          clientHeight: {
            value: 40,
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

    return (
      <>
        <label data-testid="currentValueScrollTop">{scrollTop}</label>
        <div data-testid="scrollContainer" ref={ref} style={{ height: '40px', overflow: 'auto' }}>
          {items}
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

  it('Should render without error', () => {
    makeSut();
    expect(getCurrentScrollTop()).toBe(0);
  });

  it('Should increment scrollTop on wheel down', () => {
    const { itemHeight } = makeSut();
    fireScroll(1);
    expect(getCurrentScrollTop()).toBe(0 + itemHeight);
  });

  it('Should decrement scrollTop on wheel up', () => {
    const { itemHeight } = makeSut();
    fireScroll(10);
    expect(getCurrentScrollTop()).toBe(itemHeight);
    fireScroll(1);
    expect(getCurrentScrollTop()).toBe(0);
  });

  it('Should not set scrollTop to be less than 0', () => {
    makeSut();
    fireScroll(-1);
    expect(getCurrentScrollTop()).toBe(0);
  });

  it('Should not set scrollTop to be greater than DOM element scrollHeight', () => {
    const { itemHeight } = makeSut();

    fireScroll(10);
    expect(getCurrentScrollTop()).toBe(itemHeight);
    fireScroll(60);
    expect(getCurrentScrollTop()).toBe(itemHeight * 2);
    fireScroll(120);
    expect(getCurrentScrollTop()).toBe(itemHeight * 2);
  });
});

describe('useScrollStepSize dynamic', () => {
  beforeAll(() => {
    replaceRaf();
  });

  beforeEach(() => {
    requestAnimationFrame.reset();
  });

  it('Should render without error', () => {
    makeSut(0);
    expect(getCurrentScrollTop()).toBe(0);
  });

  it('Should increment scrollTop on wheel down', () => {
    makeSut(0);
    fireScroll(1);
    const firstItemHeight = screen.getByTestId('item-0').clientHeight;
    expect(getCurrentScrollTop()).toBe(firstItemHeight);
  });

  it('Should decrement scrollTop on wheel up', () => {
    makeSut(0);
    const firstItemHeight = screen.getByTestId('item-0').clientHeight;
    fireScroll(10);
    expect(getCurrentScrollTop()).toBe(firstItemHeight);
    fireScroll(1);
    expect(getCurrentScrollTop()).toBe(0);
  });

  it('Should not set scrollTop to be less than 0', () => {
    makeSut(0);
    fireScroll(-1);
    expect(getCurrentScrollTop()).toBe(0);
  });

  it('Should not set scrollTop to be greater than DOM element scrollHeight', async () => {
    makeSut(0);
    const firstItemHeight = screen.getByTestId('item-0').clientHeight;
    const secondItemHeight = screen.getByTestId('item-1').clientHeight;

    fireScroll(10);
    expect(getCurrentScrollTop()).toBe(firstItemHeight);
    fireScroll(60);
    expect(getCurrentScrollTop()).toBe(firstItemHeight + secondItemHeight);
    fireScroll(120);
    expect(getCurrentScrollTop()).toBe(firstItemHeight + secondItemHeight);
  });
});
