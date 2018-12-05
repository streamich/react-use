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
declare const useSpeech: (text: string, opts?: SpeechOptions) => SpeechState;
export default useSpeech;
