import React, { ComponentType, forwardRef } from 'react';

type passedHook<TProps, TReturnType> = (props: TProps) => TReturnType;

function withHook<THookProps, THookReturnType>(useHook: passedHook<THookProps, THookReturnType>) {
  return <TComponentProps, TMapperReturnType extends TComponentProps>(
    WrappedComponent: ComponentType<TComponentProps>,
    mapHookToProps: (hook: THookReturnType, props: TComponentProps) => TMapperReturnType
  ) => {
    return forwardRef((props: THookProps & TComponentProps, ref) => {
      const hookValues = useHook(props);

      return <WrappedComponent ref={ref} {...mapHookToProps(hookValues, props)} />;
    });
  };
}

export default withHook;
