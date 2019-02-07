import * as React from 'react';
export declare type Element = ((state: State) => React.ReactElement<any>) | React.ReactElement<any>;
export interface State {
    width: number;
    height: number;
}
declare const useSize: (element: Element, { width, height }?: Partial<State>) => [React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, State];
export default useSize;
