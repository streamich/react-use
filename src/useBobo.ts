const SPOTIFY_URL = 'https://open.spotify.com/track/1jGATZ2aFc6yL5ycanq0iO';
const YOU_TUBE_URL = 'https://www.youtube.com/watch?v=nn5hCEMyE-E';

interface BoboAttrs {
  spotifyUrl: string;
  youTubeUrl: string;
}

const BOBO_ATTRS: BoboAttrs = {
  spotifyUrl: SPOTIFY_URL,
  youTubeUrl: YOU_TUBE_URL,
};

export function useBobo(): BoboAttrs {
  return BOBO_ATTRS;
}

export default useBobo;
