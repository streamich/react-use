import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import useLocalStorage from '../src/useLocalStorage';

interface ComplexValue {
  one?: string;
  two?: string;
}

const Container: React.FC = () => {
  const [value, setValue] = useLocalStorage<ComplexValue>('key');

  const oneUpdater = () => {
    setValue((cur) => ({ ...cur, one: 'updated' }));
  };

  const twoUpdater = () => {
    setValue((cur) => ({ ...cur, two: 'updated' }));
  };

  return <>
    <p>{JSON.stringify(value, null, 2)}</p>
    <button onClick={() => oneUpdater()}>update one</button>
    <button onClick={() => twoUpdater()}>update two</button>
  </>;
};

describe(useLocalStorage, () => {
  afterEach(() => {
    window.localStorage.clear();
  });
  it('should not lose previous changes', () => {
    const { getByText } = render(<Container/>);
    fireEvent.click(getByText('update one'));
    expect(window.localStorage.getItem('key')).toEqual(JSON.stringify({ one: 'updated' }));

    fireEvent.click(getByText('update two'));
    expect(window.localStorage.getItem('key')).toEqual(JSON.stringify({ one: 'updated', two: 'updated' }));
  });
});
