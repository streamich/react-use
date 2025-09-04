import { renderHook } from '@testing-library/react-hooks';
import { useDocumentTitle } from '../src';

it('should set the document title on mount', () => {
  const title = 'Doc Title';

  renderHook(() => useDocumentTitle(title));

  expect(document.title).toBe(title);
});

it('should update the title when argument changes', () => {
  const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
    initialProps: { title: 'First Title' },
  });

  expect(document.title).toBe('First Title');

  rerender({ title: 'Second Title' });

  expect(document.title).toBe('Second Title');
});
