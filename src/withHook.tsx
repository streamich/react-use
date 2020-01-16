import React from 'react';

type passedHook<T> = (props: React.Props<T>) => any;

function withHook<T>(useHook: passedHook<T>) {
  return (WrappedComponent: React.ComponentType<T>) => (props: React.Props<T>) => {
    const propsToMapFromHook = useHook(props);

    return <WrappedComponent {...propsToMapFromHook} {...props} />;
  };
}

export default withHook;
