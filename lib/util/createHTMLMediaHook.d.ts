import * as React from 'react';
export interface HTMLMediaProps extends React.AudioHTMLAttributes<any>, React.VideoHTMLAttributes<any> {
    src: string;
}
export interface HTMLMediaState {
    buffered: any[];
    duration: number;
    isPlaying: boolean;
    muted: boolean;
    time: number;
    volume: number;
}
export interface HTMLMediaControls {
    play: () => Promise<void> | void;
    pause: () => void;
    mute: () => void;
    unmute: () => void;
    volume: (volume: number) => void;
    seek: (time: number) => void;
}
declare const createHTMLMediaHook: (tag: "audio" | "video") => (elOrProps: HTMLMediaProps | React.ReactElement<HTMLMediaProps>) => [React.ReactElement<HTMLMediaProps>, HTMLMediaState, HTMLMediaControls, {
    current: HTMLAudioElement | null;
}];
export default createHTMLMediaHook;
