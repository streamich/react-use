import { useCallback, useEffect, useRef, useState } from 'react';

type SpeechOptions = {
  lang: string;
  voice?: SpeechSynthesisVoice;
  rate: number;
  pitch: number;
  volume: number;
};

export type ISpeechOptions = Partial<SpeechOptions>;

export type VoiceInfo = Pick<SpeechSynthesisVoice, 'lang' | 'name'>;

export type ISpeechState = SpeechOptions & {
  isPlaying: boolean;
  status: string;
  voiceInfo: VoiceInfo;
};

enum Status {
  init,
  play,
  pause,
  end,
}

const useSpeech = (text: string, options: ISpeechOptions): ISpeechState => {
  let mounted = useRef<boolean>(false);
  const [state, setState] = useState<ISpeechState>(() => {
    const { lang = 'default', name = '' } = options.voice || {};
    return {
      isPlaying: false,
      status: Status[Status.init],
      lang: options.lang || 'default',
      voiceInfo: { lang, name },
      rate: options.rate || 1,
      pitch: options.pitch || 1,
      volume: options.volume || 1,
    };
  });

  const handlePlay = useCallback(() => {
    if (!mounted.current) {
      return;
    }
    setState((preState) => {
      return { ...preState, isPlaying: true, status: Status[Status.play] };
    });
  }, []);

  const handlePause = useCallback(() => {
    if (!mounted.current) {
      return;
    }
    setState((preState) => {
      return { ...preState, isPlaying: false, status: Status[Status.pause] };
    });
  }, []);

  const handleEnd = useCallback(() => {
    if (!mounted.current) {
      return;
    }
    setState((preState) => {
      return { ...preState, isPlaying: false, status: Status[Status.end] };
    });
  }, []);

  useEffect(() => {
    mounted.current = true;
    const utterance = new SpeechSynthesisUtterance(text);
    options.lang && (utterance.lang = options.lang);
    options.voice && (utterance.voice = options.voice);
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    utterance.onstart = handlePlay;
    utterance.onpause = handlePause;
    utterance.onresume = handlePlay;
    utterance.onend = handleEnd;
    window.speechSynthesis.speak(utterance);

    return () => {
      mounted.current = false;
    };
  }, []);

  return state;
};

export default useSpeech;
