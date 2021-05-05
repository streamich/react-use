import useKey from '../useKey.js';
import createRenderProp from '../factory/createRenderProp.js';

const UseKey = createRenderProp(useKey, ({ filter, fn, deps, ...rest }) => [
  filter,
  fn,
  rest,
  deps,
]);

export default UseKey;
