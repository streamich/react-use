import React from 'react';

type passedHook<T> = (props: React.Props<T>) => object | undefined;

function withHook<T>(useHook: passedHook<T>) {
  return (WrappedComponent: React.ComponentType<T>) => (props: React.PropsWithChildren<T>) => {
    const propsToMapFromHook = useHook(props);

    return <WrappedComponent {...propsToMapFromHook} {...props} />;
  };
}

export default withHook;
