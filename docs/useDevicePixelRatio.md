# `useDefault`

React hook that returns the device pixel ratio and updates the value everytime the user zooms in/out.

## Usage

```jsx
import {useDevicePixelRatio} from 'react-use';

const Demo = () => {
    const {ratio} = useDevicePixelratio();
    return (
        <p>{ratio}</p>
    );
};
```
