# `useKeyboardJs`

React UI sensor hook that detects complex key combos like detecting when
multiple keys are held down at the same time or requiring them to be held down in a specified order.

Via [KeyboardJS key combos](https://github.com/RobertWHurst/KeyboardJS).
Check its documentation for further details on how to make combo strings.

## Usage

```jsx
import useKeyboardJs from 'react-use/lib/useKeyboardJs';

const Demo = () => {
  const [isPressed] = useKeyboardJs('a + b');

  return (
    <div>
      [a + b] pressed: {isPressed ? 'Yes' : 'No'}
    </div>
  );
};
```

Note: Because of dependency on `keyboardjs` you have to import this hook directly like shown above.

## Requirements

Install [`keyboardjs`](https://github.com/RobertWHurst/KeyboardJS) peer dependency:

```bash
npm add keyboardjs
# or
yarn add keyboardjs
```

## Reference

```js
useKeyboardJs(combination: string | string[]): [isPressed: boolean, event?: KeyboardEvent]
```
