import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks';
import useFocus from '../src/useFocus';

it('should be defined', () => {
  expect(useFocus).toBeDefined();
});

it('should return an element (object) and a boolean', () => {
  const element = () => (<label htmlFor="foo">Foo<input id="foo" type="text" value="foo"/></label>)
  const { result } = renderHook(() => useFocus(element))

  expect(result.current.length).toBe(2);
  expect(typeof result.current[0]).toBe('object');
  expect(typeof result.current[1]).toBe('boolean');
});

it('should change focused to true when calling onFocus and to false when calling onBlur', () => {
  const element = () => (<label id="labelFoo" htmlFor="foo">Foo<input id="foo" type="text"/></label>)
  const { result } = renderHook(() => useFocus(element))
  
  const component = result.current[0]

  expect(result.current[1]).toBe(false)

  act(() => {
    component.props.onFocus()
  })

  expect(result.current[1]).toBe(true)

  act(() => {
    component.props.onBlur()
  })

  expect(result.current[1]).toBe(false)  
});
