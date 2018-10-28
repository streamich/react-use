export declare type UseToggle = (state: boolean) => [boolean, // state
() => void, // toggle
(state: boolean) => void];
declare const useToggle: UseToggle;
export default useToggle;
