import createHTMLMediaHook from './factory/createHTMLMediaHook.js';

const useVideo = createHTMLMediaHook<HTMLVideoElement>('video');

export default useVideo;
