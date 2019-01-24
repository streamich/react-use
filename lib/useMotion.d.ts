export interface MotionSensorState {
    acceleration: {
        x: number | null;
        y: number | null;
        z: number | null;
    };
    accelerationIncludingGravity: {
        x: number | null;
        y: number | null;
        z: number | null;
    };
    rotationRate: {
        alpha: number | null;
        beta: number | null;
        gamma: number | null;
    };
    interval: number | null;
}
declare const useMotion: (initialState?: MotionSensorState) => MotionSensorState;
export default useMotion;
