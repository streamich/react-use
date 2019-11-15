import { useRef } from 'react';

function useTitle(title: string) {
    let prevTitleContainer = useRef<string>();
    prevTitleContainer.current = document.title;
    document.title = title;
    useEffect(()=>{
        return ()=>{
            document.title = <string>prevTitleContainer.current;
        }
    });
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
