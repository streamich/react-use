import createHTMLMediaHook from './factory/createHTMLMediaHook.js';

const useAudio = createHTMLMediaHook<HTMLAudioElement>('audio');
export default useAudio;
