import { create, NanoRenderer } from 'nano-css';
import { addon as addonCSSOM, CSSOMAddon } from 'nano-css/addon/cssom';
import { addon as addonVCSSOM, VCSSOMAddon } from 'nano-css/addon/vcssom';
import { cssToTree } from 'nano-css/addon/vcssom/cssToTree';
import { useMemo } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

type Nano = NanoRenderer & CSSOMAddon & VCSSOMAddon;
const nano = create() as Nano;
addonCSSOM(nano);
addonVCSSOM(nano);

let counter = 0;

const useCss = (css: object): string => {
  const className = useMemo(() => 'react-use-css-' + (counter++).toString(36), []);
  const sheet = useMemo(() => new nano.VSheet(), []);

  useIsomorphicLayoutEffect(() => {
    const tree = {};
    cssToTree(tree, css, '.' + className, '');
    sheet.diff(tree);

    return () => {
      sheet.diff({});
    };
  });

  return className;
};

export default useCss;
