import React from "react";

interface FakeResourcesHookProps {
    data: any;
    delay: number,
};

export default function useFakeResources({ data, delay }: FakeResourcesHookProps) {

    const [loading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        let timeout = setTimeout(() => {
            setIsLoading(false)
        }, delay);
        return () => clearTimeout(timeout);
    }, []);

    function triggerLoading(): void {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, delay);
    }

    return [loading ? null : data, loading, triggerLoading]
}