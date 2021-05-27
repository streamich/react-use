# `useMonetization`

React side-effect hook that sets monetization wallet address and return it status.

## Usage

```jsx
import {useMonetization} from 'react-use';

const Demo = () => {
  const {status, setWallet, removeWallet} = useMonetization();
  
  useEffect(() => {
      setWallet('$wallet.example.com/alice');
  }, []);
  
  const remove = useCallback(() => removeWallet(), []);

  if (status === 'started') {
    return <PaidContent/>
  } else {
    return <FreeContent/>
  }
};
```

for more info about web monetization refer to official
site: [Web Monetization](https://webmonetization.org/)
