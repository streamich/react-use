import useSessionStorage from '../src/useSessionStorage';

jest.mock('../src/misc/util', () => ({
  isBrowser: false,
}));

describe('useSessionStorage on the server', () => {
  it('returns the initial value and a safe state setter', () => {
    const [value, setValue] = useSessionStorage('value', 'initial');

    expect(value).toBe('initial');
    expect(setValue('updated')).toBeUndefined();
  });
});
