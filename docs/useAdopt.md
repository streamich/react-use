# `useAdopt`

Extracts a values from multiple render-prop or FaCC components.
This hook is similar to [`useRenderProp`](./useRenderProp.md), but
it allows to specify a named map of multiple render-prop elements
from which to extract values.


## Usage

```jsx
import {useAdopt} from 'react-use';

const FaCC = ({children}) => {
  return children('VALUE-FaCC');
};
const RenderProp = ({render}) => {
  return render('VALUE-RenderProp');
};

const Demo = () => {
  const [fragment, result] = useAdopt({
    facc: <FaCC/>,
    renderProp: <RenderProp/>,
  });

  return (
    <>
      {fragment}
      <div>FaCC: {result.facc[0]}</div>
      <div>Render prop: {result.renderProp[0]}</div>
    </>
  );
};
```
