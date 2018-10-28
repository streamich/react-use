export interface CssPipe {
    className: string;
    css: (css: object) => void;
    remove: () => void;
}
declare const useCss: (css: object) => string;
export default useCss;
