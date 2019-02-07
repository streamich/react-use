import * as React from 'react';
export declare type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;
declare const useHover: (element: Element) => [React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, boolean];
export default useHover;
