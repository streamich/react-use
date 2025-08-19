import { renderHook } from '@testing-library/react-hooks';

import { useImage } from '../src';

describe('useFavicon', () => {
  it('should be defined', () => {
    expect(useImage).toBeDefined();
  });

  it('should have started fetching', async () => {
    const { result } = renderHook(() => useImage('https://via.placeholder.com/150'));

    expect(result.current.hasStartedInitialFetch).toBe(true);
  });
});
