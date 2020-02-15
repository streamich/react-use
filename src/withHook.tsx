import React, { ComponentType, forwardRef } from 'react';

type passedHook<T> = (props: T) => object;

function withHook<T>(WrappedComponent: ComponentType<T>, useHook: passedHook<T>) {
  return forwardRef((props: T, ref) => {
    const hookValues = useHook(props);

    return <WrappedComponent ref={ref} {...props} {...hookValues} />;
  });
}

export default withHook;
