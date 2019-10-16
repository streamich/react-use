# `useRafState`

React state hook that only updates state in the callback of [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

## Usage

```jsx
import {useRafState, useMount} from 'react-use';

const Demo = () => {
  const [state, setState] = useRafState({
    width: 0,
    height: 0,
  });

  useMount(() => {
    const onResize = () => {
      setState({
        width: window.clientWidth,
        height: window.height,
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
```
