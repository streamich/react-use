# `useSwitcher`

React hook that tracks a boolean state with dedicated functions for turning on, off, and toggling.

Similar to `useToggle`, but instead of a single toggle function, it provides three separate control functions for more explicit state management.

## Usage

```jsx
import { useSwitcher } from 'react-use';

const Demo = () => {
  const [isOn, turnOn, turnOff, toggle] = useSwitcher();

  return (
    <div>
      <div>State: {isOn ? 'ON' : 'OFF'}</div>
      <button onClick={turnOn}>Turn On</button>
      <button onClick={turnOff}>Turn Off</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};
```

## Examples

### With initial value

```jsx
const [isOpen, openModal, closeModal, toggleModal] = useSwitcher(true);
```

### In a modal component

```jsx
const Modal = () => {
  const [isOpen, openModal, closeModal] = useSwitcher(false);

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <h2>Modal Content</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  );
};
```

### In a sidebar component

```jsx
const Sidebar = () => {
  const [isVisible, showSidebar, hideSidebar, toggleSidebar] = useSwitcher(true);

  return (
    <>
      <button onClick={toggleSidebar}>
        {isVisible ? 'Hide' : 'Show'} Sidebar
      </button>
      <aside style={{ display: isVisible ? 'block' : 'none' }}>
        <nav>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </nav>
        <button onClick={hideSidebar}>Close</button>
      </aside>
    </>
  );
};
```

## Reference

```typescript
const [state, turnOn, turnOff, toggle] = useSwitcher(defaultValue?);
```

### Parameters

- `defaultValue`: `boolean` - Initial state value. Defaults to `false`.

### Returns

Returns a tuple with the following elements:

- `state`: `boolean` - Current state value.
- `turnOn`: `() => void` - Function that sets state to `true`.
- `turnOff`: `() => void` - Function that sets state to `false`.
- `toggle`: `() => void` - Function that toggles the state.

## Related hooks

- [`useToggle`](./useToggle.md) - Similar hook with a single toggle function
- [`useBoolean`](./useBoolean.md) - Alias for `useToggle`
