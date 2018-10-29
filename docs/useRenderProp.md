# `useRenderProp`

Extracts a value from render-prop or FaCC component.


## Usage

```jsx
import {useRenderProp} from 'react-use';

const FaCC = ({children}) => {
  return children('VALUE-FaCC');
};
const RenderProp = ({render}) => {
  return render('VALUE-RenderProp');
};

const Demo = () => {
  const [fragment1, [value1]] = useRenderProp(<FaCC />);
  const [fragment2, [value2]] = useRenderProp(<RenderProp />);

  return (
    <>
      {fragment1}
      {fragment2}
      <div>FaCC: {value1}</div>
      <div>Render prop: {value2}</div>
    </>
  );
};
```
