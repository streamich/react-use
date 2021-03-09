const defaultMapPropsToArgs = (props) => [props];

export default function createRenderProp(hook, mapPropsToArgs = defaultMapPropsToArgs) {
  return function RenderProp(props) {
    const state = hook(...mapPropsToArgs(props));
    const { children, render = children } = props;
    return render ? render(state) || null : null;
  };
}
