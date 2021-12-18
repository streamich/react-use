import createHTMLMediaHook from './factory/createHTMLMediaHook';

const useAudio = createHTMLMediaHook<HTMLAudioElement>('audio');
export default useAudio;
