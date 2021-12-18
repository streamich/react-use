import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { off, on } from './misc/util';

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
  useIsomorphicLayoutEffect(() => {
    const keydown = (event) => {
      !isFocusedElementEditable() && isTypedCharGood(event) && onStartTyping(event);
    };

    on(document, 'keydown', keydown);
    return () => {
      off(document, 'keydown', keydown);
    };
  }, []);
};

export default useStartTyping;
