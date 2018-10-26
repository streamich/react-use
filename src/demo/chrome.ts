import * as React  from 'react';
import {render} from 'react-dom';

export {
  React,
};

export const demo = (element: React.ReactElement<any>) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  render(element, div);
};
