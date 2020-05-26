/* eslint-disable */
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import useLatest from './useLatest';

const isFocusedElementEditable = () => {
  const { activeElement, body } = document;

  if (!activeElement) {
    return false;
  }

  // If not element has focus, we assume it is not editable, too.
  if (activeElement === body) {
    return false;
  }

  // Assume <input> and <textarea> elements are editable.
  switch (activeElement.tagName) {
    case 'INPUT':
    case 'TEXTAREA':
      return true;
  }

  // Check if any other focused element id editable.
  return activeElement.hasAttribute('contenteditable');
};

const isTypedCharGood = ({ keyCode, metaKey, ctrlKey, altKey }: KeyboardEvent) => {
  if (metaKey || ctrlKey || altKey) {
    return false;
  }
  // 0...9
  if (keyCode >= 48 && keyCode <= 57) {
    return true;
  }
  // a...z
  if (keyCode >= 65 && keyCode <= 90) {
    return true;
  }
  // All other keys.
  return false;
};

const useStartTyping = (onStartTyping: (event: KeyboardEvent) => void) => {
  const latestOnStartTyping = useLatest(onStartTyping);

  useIsomorphicLayoutEffect(() => {
    const keydown = event => {
      !isFocusedElementEditable() && isTypedCharGood(event) && latestOnStartTyping.current(event);
    };

    document.addEventListener('keydown', keydown);
    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, []);
};

export default useStartTyping;
