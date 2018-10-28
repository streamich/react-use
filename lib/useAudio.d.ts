import * as React from 'react';
import { ReactRef } from './react';
export interface AudioProps extends React.AudioHTMLAttributes<any> {
    src: string;
}
export interface AudioState {
    buffered: any[];
    duration: number;
    isPlaying: boolean;
    muted: boolean;
    time: number;
    volume: number;
}
export interface AudioControls {
    play: () => Promise<void> | void;
    pause: () => void;
    mute: () => void;
    unmute: () => void;
    volume: (volume: number) => void;
    seek: (time: number) => void;
}
declare const useAudio: (props: AudioProps) => [React.ReactElement<AudioProps>, AudioState, AudioControls, ReactRef<HTMLAudioElement | null>];
export default useAudio;
