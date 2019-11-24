import { renderHook } from '@testing-library/react-hooks';
import useAudio from '../src/useAudio';
const setUp = (
  src: string = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  autoPlay: boolean = true
) => renderHook(() => useAudio({ src, autoPlay }));

it('should init audio and utils', () => {
  global.console.error = jest.fn();

  const MOCK_AUDIO_SRC = 'MOCK_AUDIO_SRC';
  const MOCK_AUTO_PLAY_STATE = true;
  const { result } = setUp(MOCK_AUDIO_SRC, MOCK_AUTO_PLAY_STATE);
  const [audio, state, controls, ref] = result.current;
  // if not production mode, it will show the error message, cause audio do not render
  expect(console.error).toHaveBeenCalledTimes(1);

  // Test the audio comp
  expect(audio.type).toBe('audio');
  expect(audio.props.src).toBe(MOCK_AUDIO_SRC);
  expect(audio.props.autoPlay).toBe(MOCK_AUTO_PLAY_STATE);

  // Test state value
  expect(state.time).toBe(0);
  expect(state.paused).toBe(true);
  expect(state.muted).toBe(false);
  expect(state.volume).toBe(1);

  // Test controls
  ref.current = document.createElement('audio');
  // Mock ref current for controls testing

  expect(ref.current.muted).toBe(false);
  controls.mute();
  expect(ref.current.muted).toBe(true);
  controls.unmute();
  expect(ref.current.muted).toBe(false);

  expect(ref.current.volume).toBe(1);
  controls.volume(0.5);
  expect(ref.current.volume).toBe(0.5);
});
