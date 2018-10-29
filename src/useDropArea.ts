import * as React from 'react';

const useDropArea = (el: React.ReactElement<any>) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!React.isValidElement(el)) {
      throw new TypeError(
        'useDropArea first argument must be a valid ' +
        'React element, such as <div/>.'
      );
    }
  }
};

export default useDropArea;
