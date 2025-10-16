import {useState} from 'react';

const initArrayState = (loadingName: string[]) => {
    const state = {};
    loadingName.forEach((name) => { state[name] = false });
    return state;       
}

const initialize = (states: useLoadingProps) => {
    if(typeof states === "string"){
        return ({[states]: false});
    }
    if(Array.isArray(states)){
       return initArrayState(states)
    }
    return states;
}

type useLoadingProps = string | string[] |  {[key: string]: boolean}
type useLoadingReturn = [Object, (loadingKey: string) => void, (loadingKey: string) => void ]

export const useLoading = (states: useLoadingProps): useLoadingReturn  => {
    const [state, setState] = useState(initialize(states));
 
    function startLoading(loadingKey: string){
        setState((s) => ({...s, [loadingKey]: true}))
    }

    function stopLoading(loadingKey: string){
        setState((s) => ({...s, [loadingKey]: false}))
    }

    return [state, startLoading, stopLoading];
};
