import useKey from '../useKey';
import createRenderProp from '../util/createRenderProp';

const UseKey = createRenderProp(useKey, ({ filter, fn, deps, ...rest }) => [filter, fn, rest, deps]);

export default UseKey;
