import * as React from 'react';
export declare type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>;
declare const useHover: (element: Element) => [React.ReactElement<any>, boolean];
export default useHover;
