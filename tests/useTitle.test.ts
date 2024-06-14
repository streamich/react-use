import { renderHook } from '@testing-library/react-hooks';
import useTitle from '../src/useTitle';

describe('useTitle', () => {
  it('should be defined', () => {
    expect(useTitle).toBeDefined();
  });

  it('should update document title', () => {
    const hook = renderHook((props) => useTitle(props), { initialProps: 'My page title' });

    expect(document.title).toBe('My page title');
    hook.rerender('My other page title');
    expect(document.title).toBe('My other page title');
  });

  it('should restore document title on unmount', () => {
    renderHook((props) => useTitle(props), { initialProps: 'Old Title' });
    expect(document.title).toBe('Old Title');

    const hook = renderHook((props) => useTitle(props.title, { restoreOnUnmount: props.restore }), {
      initialProps: { title: 'New Title', restore: true },
    });
    expect(document.title).toBe('New Title');
    hook.unmount();
    expect(document.title).toBe('Old Title');
  });

  it('should restore original document title on unmount', () => {
    renderHook((props) => useTitle(props), { initialProps: 'Original title' });
    expect(document.title).toBe('Original title');

    const hook = renderHook((props) => useTitle(props.title, { restoreOnUnmount: false, restoreOriginalOnUnmount: props.restore }), {
      initialProps: { title: 'New title', restore: true },
    });

    hook.rerender({ title: 'Newer title', 'restore': true });

    expect(document.title).toBe('Newer title');
    hook.unmount();
    expect(document.title).toBe('Original title');
  })
});
