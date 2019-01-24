/// <reference types="react" />
declare const useVideo: (elOrProps: import("./util/createHTMLMediaHook").HTMLMediaProps | import("react").ReactElement<import("./util/createHTMLMediaHook").HTMLMediaProps>) => [import("react").ReactElement<import("./util/createHTMLMediaHook").HTMLMediaProps>, import("./util/createHTMLMediaHook").HTMLMediaState, import("./util/createHTMLMediaHook").HTMLMediaControls, {
    current: HTMLAudioElement | null;
}];
export default useVideo;
