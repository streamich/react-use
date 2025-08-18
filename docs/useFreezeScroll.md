# `useFreezeScroll`

React hook that freezes the scroll and removes the scrollbar from the browser window when it is active without any layout shift, for example, when a modal is opened.

## Usage

```jsx
import { useFreezeScroll } from 'react-use';

const Demo = () => {
  const [isActive, setIsActive] = useState(false);
  useFreezeScroll(isActive);

  return (
    <div style={{ height: '5000px' }}>
      <div style={{ marginTop: '20px' }}>
        <p>Scroll should be frozen when enabled.</p>
        <p>Try scrolling to test the effect.</p>
      </div>
      <button onClick={() => setIsActive(!isActive)} style={{ position: 'sticky', top: '100px' }}>
        {isActive ? 'Disable Freeze Scroll' : 'Enable Freeze Scroll'}
      </button>
    </div>
  );
};
```
