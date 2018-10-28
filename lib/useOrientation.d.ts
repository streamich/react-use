export interface OrientationState {
    angle: number;
    type: string;
}
declare const useOrientation: (initialState?: OrientationState) => OrientationState;
export default useOrientation;
