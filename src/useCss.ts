import {useState, useLayoutEffect} from 'react';
const {create} = require('nano-css');
const {addon: addonCssom} = require('nano-css/addon/cssom');
const {addon: addonPipe} = require('nano-css/addon/pipe');

export interface CssPipe {
  className: string;
  css: (css: object) => void;
  remove: () => void;
}

const flattenSelectors = (css) => {
  const flatenned = {};
  const amp = {};
  let hasAmp = false;

  for (const key in css) {
    const value = css[key];
    if (typeof value === 'object') {
      flatenned[key] = value;
    } else {
      hasAmp = true;
      amp[key] = value;
    }
  }
  if (hasAmp) {
    flatenned['&'] = amp;
  }

  return flatenned;
};

const nano = create();
addonCssom(nano);
addonPipe(nano);

const useCss = (css: object): string => {
  const [pipe] = useState<CssPipe>(nano.pipe());

  useLayoutEffect(() => {
    pipe.css(flattenSelectors(css));
    return () => pipe.remove();
  });

  return pipe.className;
};

export default useCss;
