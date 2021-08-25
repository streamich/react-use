import { useRef } from 'react';
import useMount from './useMount';
import useSetState from './useSetState';
import { isBrowser } from './misc/util';

export interface SpeechState {
  isPlaying: boolean;
  lang: string;
  voice: SpeechSynthesisVoice;
  rate: number;
  pitch: number;
  volume: number;
}

export interface SpeechOptions {
  lang?: string;
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
}

const voices =
  isBrowser && typeof window.speechSynthesis === 'object' ? window.speechSynthesis.getVoices() : [];

const useSpeech = (text: string, opts: SpeechOptions = {}): SpeechState => {
  const [state, setState] = useSetState<SpeechState>({
    isPlaying: false,
    lang: opts.lang || 'default',
    voice: opts.voice || voices[0],
    rate: opts.rate || 1,
    pitch: opts.pitch || 1,
    volume: opts.volume || 1,
  });

  const uterranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useMount(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    opts.lang && (utterance.lang = opts.lang);
    opts.voice && (utterance.voice = opts.voice);
    utterance.rate = opts.rate || 1;
    utterance.pitch = opts.pitch || 1;
    utterance.volume = opts.volume || 1;
    utterance.onstart = () => setState({ isPlaying: true });
    utterance.onresume = () => setState({ isPlaying: true });
    utterance.onend = () => setState({ isPlaying: false });
    utterance.onpause = () => setState({ isPlaying: false });
    uterranceRef.current = utterance;
    window.speechSynthesis.speak(uterranceRef.current);
  });

  return state;
};

export default useSpeech;
