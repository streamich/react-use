import * as React from 'react';
declare const useAdopt: <T extends {
    [key: string]: any[];
}>(map: { [key in keyof T]: React.ReactElement<any>; }) => [React.ReactElement<any>, T];
export default useAdopt;
