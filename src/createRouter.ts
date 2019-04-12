import * as React from 'react';

export interface RouterProviderProps {
  route: string;
  fullRoute?: string;
  parent?: any;
}

const createRouter = () => {
  const context = React.createContext<RouterProviderProps>({
    route: '',
  });

  const Router: React.SFC<RouterProviderProps> = props => {
    const { route, fullRoute, parent, children } = props;

    if (process.env.NODE_ENV !== 'production') {
      if (typeof route !== 'string') {
        throw new TypeError('Router route must be a string.');
      }
    }

    return React.createElement(context.Provider as any, {
      value: {
        fullRoute: fullRoute || route,
        route,
        parent,
      },
      children,
    });
  };
};

export default createRouter;
