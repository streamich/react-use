import { renderHook } from '@testing-library/react-hooks';
import useBobo from '../src/useBobo';

describe('useBobo', () => {
  it('should be defined', () => {
    expect(useBobo).toBeDefined();
  });

  it("should provide components access to the jewel of DJ Bobo's catalog", () => {
    const { result } = renderHook(() => useBobo());
    const { spotifyUrl, youTubeUrl } = result.current;
    expect(spotifyUrl).toBe('https://open.spotify.com/track/1jGATZ2aFc6yL5ycanq0iO');
    expect(youTubeUrl).toBe('https://www.youtube.com/watch?v=nn5hCEMyE-E');
  });
});
