import React from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import useDropArea, { DropAreaOptions } from '../src/useDropArea';

const DropArea = (options: DropAreaOptions) => {
  const [bond, { over }] = useDropArea(options);

  return (
    <div {...bond} data-testid="area" data-over={over}>
      <div data-testid="child">
        <span data-testid="grandchild">Drop here</span>
      </div>
      <div data-testid="sibling">Or here</div>
    </div>
  );
};

const dataTransfer = {
  getData: () => 'https://example.com',
};

describe('useDropArea', () => {
  it('should enter and leave the drop area', () => {
    const { getByTestId } = render(<DropArea />);
    const area = getByTestId('area');
    const enter = createEvent.dragEnter(area);
    const over = createEvent.dragOver(area);

    expect(area.getAttribute('data-over')).toBe('false');

    fireEvent(area, enter);
    expect(enter.defaultPrevented).toBe(true);
    expect(area.getAttribute('data-over')).toBe('true');

    fireEvent(area, over);
    expect(over.defaultPrevented).toBe(true);

    fireEvent.dragLeave(area);
    expect(area.getAttribute('data-over')).toBe('false');
  });

  it('should stay over the area when entering a child without relatedTarget', () => {
    const { getByTestId } = render(<DropArea />);
    const area = getByTestId('area');
    const child = getByTestId('child');

    fireEvent.dragEnter(area);
    fireEvent.dragEnter(child);
    fireEvent.dragLeave(area);

    expect(area.getAttribute('data-over')).toBe('true');

    fireEvent.dragLeave(child);
    expect(area.getAttribute('data-over')).toBe('false');
  });

  it('should stay over the area when moving between descendants', () => {
    const { getByTestId } = render(<DropArea />);
    const area = getByTestId('area');
    const child = getByTestId('child');
    const grandchild = getByTestId('grandchild');
    const sibling = getByTestId('sibling');

    fireEvent.dragEnter(child);
    fireEvent.dragEnter(grandchild);
    fireEvent.dragLeave(child);
    expect(area.getAttribute('data-over')).toBe('true');

    fireEvent.dragEnter(sibling);
    fireEvent.dragLeave(grandchild);
    expect(area.getAttribute('data-over')).toBe('true');

    fireEvent.dragLeave(sibling);
    expect(area.getAttribute('data-over')).toBe('false');
  });

  it('should preserve drag state when the callbacks change during a drag', () => {
    const onUri = jest.fn();
    const nextOnUri = jest.fn();
    const { getByTestId, rerender } = render(<DropArea onUri={onUri} />);
    const area = getByTestId('area');
    const child = getByTestId('child');

    fireEvent.dragEnter(area);
    fireEvent.dragEnter(child);
    rerender(<DropArea onUri={nextOnUri} />);
    fireEvent.dragLeave(area);

    expect(area.getAttribute('data-over')).toBe('true');

    fireEvent.drop(child, { dataTransfer });
    expect(area.getAttribute('data-over')).toBe('false');
    expect(onUri).not.toHaveBeenCalled();
    expect(nextOnUri).toHaveBeenCalledWith('https://example.com', expect.any(Object));
  });

  it('should reset nested drag entries after a drop', () => {
    const onUri = jest.fn();
    const { getByTestId } = render(<DropArea onUri={onUri} />);
    const area = getByTestId('area');
    const child = getByTestId('child');
    const drop = createEvent.drop(child, { dataTransfer });

    fireEvent.dragEnter(area);
    fireEvent.dragEnter(child);
    fireEvent(child, drop);

    expect(drop.defaultPrevented).toBe(true);
    expect(area.getAttribute('data-over')).toBe('false');
    expect(onUri).toHaveBeenCalledTimes(1);

    fireEvent.dragEnter(area);
    fireEvent.dragLeave(area);
    expect(area.getAttribute('data-over')).toBe('false');
  });

  it('should tolerate dragleave events after a drop before the next drag', () => {
    const { getByTestId } = render(<DropArea />);
    const area = getByTestId('area');
    const child = getByTestId('child');

    fireEvent.dragEnter(child);
    fireEvent.drop(child, { dataTransfer });
    fireEvent.dragLeave(child);

    fireEvent.dragEnter(area);
    fireEvent.dragEnter(child);
    fireEvent.dragLeave(area);
    expect(area.getAttribute('data-over')).toBe('true');

    fireEvent.dragLeave(child);
    expect(area.getAttribute('data-over')).toBe('false');
  });

  it('should preserve an active drag when pasting', () => {
    const onUri = jest.fn();
    const { getByTestId } = render(<DropArea onUri={onUri} />);
    const area = getByTestId('area');
    const child = getByTestId('child');

    fireEvent.dragEnter(area);
    fireEvent.dragEnter(child);
    fireEvent.paste(area, { clipboardData: dataTransfer });
    fireEvent.dragLeave(area);

    expect(onUri).toHaveBeenCalledTimes(1);
    expect(area.getAttribute('data-over')).toBe('true');

    fireEvent.dragLeave(child);
    expect(area.getAttribute('data-over')).toBe('false');
  });

  it('should track nested drop areas independently', () => {
    const NestedAreas = () => {
      const [outerBond, outerState] = useDropArea();
      const [innerBond, innerState] = useDropArea();

      return (
        <div {...outerBond} data-testid="outer" data-over={outerState.over}>
          <div {...innerBond} data-testid="inner" data-over={innerState.over} />
        </div>
      );
    };
    const { getByTestId } = render(<NestedAreas />);
    const outer = getByTestId('outer');
    const inner = getByTestId('inner');

    fireEvent.dragEnter(outer);
    fireEvent.dragEnter(inner);
    fireEvent.dragLeave(outer);
    expect(outer.getAttribute('data-over')).toBe('true');
    expect(inner.getAttribute('data-over')).toBe('true');

    fireEvent.dragEnter(outer);
    fireEvent.dragLeave(inner);
    expect(outer.getAttribute('data-over')).toBe('true');
    expect(inner.getAttribute('data-over')).toBe('false');

    fireEvent.dragLeave(outer);
    expect(outer.getAttribute('data-over')).toBe('false');
  });

  it.each(['drop', 'paste'])('should continue to process files on %s', (eventName) => {
    const onFiles = jest.fn();
    const onText = jest.fn();
    const file = new File(['contents'], 'example.txt', { type: 'text/plain' });
    const transfer = { getData: () => '', files: [file] };
    const { getByTestId } = render(<DropArea onFiles={onFiles} onText={onText} />);
    const area = getByTestId('area');

    if (eventName === 'drop') {
      fireEvent.drop(area, { dataTransfer: transfer });
    } else {
      fireEvent.paste(area, { clipboardData: transfer });
    }

    expect(onFiles).toHaveBeenCalledWith([file], expect.any(Object));
    expect(onText).not.toHaveBeenCalled();
  });

  it('should process text with the latest callback after the options change', () => {
    const onText = jest.fn();
    const nextOnText = jest.fn();
    const { getByTestId, rerender } = render(<DropArea onText={onText} />);
    const area = getByTestId('area');

    rerender(<DropArea onText={nextOnText} />);
    fireEvent.drop(area, {
      dataTransfer: {
        getData: () => '',
        files: [],
        items: [{ getAsString: (callback) => callback('Dropped text') }],
      },
    });

    expect(onText).not.toHaveBeenCalled();
    expect(nextOnText).toHaveBeenCalledWith('Dropped text', expect.any(Object));
  });

  it.each([
    { getData: () => '', files: [new File(['contents'], 'example.txt')] },
    { getData: () => '', items: [{ getAsString: (callback) => callback('Dropped text') }] },
    { getData: () => '' },
    { getData: () => '', files: [], items: [] },
  ])('should accept drops without registered callbacks', (transfer) => {
    const { getByTestId, rerender } = render(<DropArea />);
    const area = getByTestId('area');

    fireEvent.dragEnter(area);
    fireEvent.drop(area, { dataTransfer: transfer });
    expect(area.getAttribute('data-over')).toBe('false');

    rerender(<DropArea onUri={jest.fn()} />);
    fireEvent.dragEnter(area);
    fireEvent.drop(area, { dataTransfer: transfer });
    expect(area.getAttribute('data-over')).toBe('false');
  });
});
