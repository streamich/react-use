import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useHover } from '../src';

describe('useHover', () => {
  test('should return hovered state if mouse hover and leave the component', () => {
    const Demo = () => {
      const element = (hovered: boolean) => <div>Hover me! {hovered && 'Thanks!'}</div>;
      const [el, hovered] = useHover(element);
      return (
        <div>
          {el}
          <p>{hovered ? 'HOVERED' : ''}</p>
        </div>
      );
    };
    render(<Demo />);
    expect(screen.queryByText('HOVERED')).toBeNull();
    fireEvent.mouseEnter(screen.getByText('Hover me!'));
    expect(screen.getByText('HOVERED')).toBeTruthy();
    fireEvent.mouseLeave(screen.getByText('Hover me! Thanks!'));
    expect(screen.queryByText('HOVERED')).toBeNull();
  });

  test('should return hovered state if mouse hover and leave the component instance', () => {
    const Demo = () => {
      const element = <div>Hover me!</div>;
      const [el, hovered] = useHover(element);
      return (
        <div>
          {el}
          <p>{hovered ? 'HOVERED' : ''}</p>
        </div>
      );
    };
    render(<Demo />);
    expect(screen.queryByText('HOVERED')).toBeNull();
    fireEvent.mouseEnter(screen.getByText('Hover me!'));
    expect(screen.getByText('HOVERED')).toBeTruthy();
    fireEvent.mouseLeave(screen.getByText('Hover me!'));
    expect(screen.queryByText('HOVERED')).toBeNull();
  });

  test('should trigger the mouseEnter and mouseLeave events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const Demo = () => {
      const element = (hovered: boolean) => (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          Hover me! {hovered && 'Thanks!'}
        </div>
      );
      const [el] = useHover(element);
      return <div>{el}</div>;
    };
    render(<Demo />);
    fireEvent.mouseEnter(screen.getByText('Hover me!'));
    expect(onMouseEnter).toBeCalled();
    fireEvent.mouseLeave(screen.getByText('Hover me! Thanks!'));
    expect(onMouseLeave).toBeCalled();
  });
});
