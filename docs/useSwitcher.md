# `useSwitcher`

## Description
Hook for easy managing boolean states. 
Easy one-line usage instead of creating

```jsx
[isOpen, setIsOpen] = useState(true);
const open = useCallback(() => setIsOpen(true), []);
const close = useCallback(() => setIsOpen(false), []);
const switchIsOpen = useCallback((v) => setIsOpen(!v), []);
```


## Usage

```jsx
import {useSwitcher} from 'react-use';

const Demo = () => {
  const {isSwitchedOn, setIsSwitchedOn, switchOn, switchOff, toggleSwitcher} = useSwitcher();
};
```

## Explanation

Lets imagine you have checkbox on he page, then:
* `isSwitchedOn` - current state (true → on / false → off)
* `setIsSwitchedOn` - switch to (setIsSwitchedOn(true) → on / setIsSwitchedOn(false) → off)
* `switchOn` - switch on
* `switchOff` - switch off
* `toggleSwitcher` - toggle state from (on → off / off → on)

## Multi-usage in one Component

```jsx
import {useSwitcher} from 'react-use';

const Demo = () => {
  const {isSwitchedOn: isFirstOn, toggleSwitcher: toggleFirst} = useSwitcher();
  const {isSwitchedOn: isSecondOn, switchOff: closeSecond} = useSwitcher();
};
```
