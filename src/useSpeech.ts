import { useRef } from 'react';
import useMount from './useMount';
import useSetState from './useSetState';

export interface SpeechState {
  isPlaying: boolean;
  volume: number;
}

export interface SpeechOptions {
  lang?: any;
  pitch?: number;
  rate?: number;
  voice?: any;
  volume?: number;
}

const useSpeech = (text: string, opts: SpeechOptions = {}): SpeechState => {
  const [state, setState] = useSetState<SpeechState>({
    isPlaying: false,
    rate: opts.rate || 1,
    volume: opts.volume || 1,
  });

  const uterranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useMount(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = opts.rate || 1;
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
