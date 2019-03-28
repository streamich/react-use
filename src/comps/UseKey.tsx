import createRenderProp from '../util/createRenderProp';
import useKey from '../useKey';

const UseKey = createRenderProp(useKey, ({filter, fn, deps, ...rest}) => [filter, fn, rest, deps]);

export default UseKey;
