import * as React  from 'react';
import {render} from 'react-dom';
import * as lib from '../../';

export {
  React,
  lib,
};

export const demo = (element: React.ReactElement<any>) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  render(element, div);
};
