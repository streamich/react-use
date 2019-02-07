/// <reference types="react" />
declare const useVideo: (elOrProps: import("./util/createHTMLMediaHook").HTMLMediaProps | import("react").ReactElement<import("./util/createHTMLMediaHook").HTMLMediaProps, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>) => [import("react").ReactElement<import("./util/createHTMLMediaHook").HTMLMediaProps, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>, import("./util/createHTMLMediaHook").HTMLMediaState, import("./util/createHTMLMediaHook").HTMLMediaControls, {
    current: HTMLAudioElement | null;
}];
export default useVideo;
