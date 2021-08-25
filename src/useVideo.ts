import createHTMLMediaHook from './factory/createHTMLMediaHook';

const useVideo = createHTMLMediaHook<HTMLVideoElement>('video');

export default useVideo;
