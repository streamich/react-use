const defaultMapPropsToArgs = (props) => [props];

const createRenderProp = (hook, mapPropsToArgs = defaultMapPropsToArgs) => {
  const RenderProp = (props) => {
    const state = hook(...mapPropsToArgs(props));
    const { children, render = children } = props;
    return render ? render(state) || null : null;
  };

  return RenderProp;
};

export default createRenderProp;
