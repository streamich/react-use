import React, { forwardRef } from 'react';

type passedHook<T> = (props: React.Props<T>) => object | undefined;

function withHook<T>(useHook: passedHook<T>) {
  return (WrappedComponent: React.ComponentType<T>) =>
    forwardRef((props: React.PropsWithChildren<T>, ref) => {
      const propsToMapFromHook = useHook(props);

      return <WrappedComponent ref={ref} {...propsToMapFromHook} {...props} />;
    });
}

export default withHook;
