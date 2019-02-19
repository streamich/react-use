import * as React from "react";
const { useState, useEffect } = React;

interface Options {
  useKeyboardJS: boolean;
}

const defaults: Options = {
  useKeyboardJS: false
};

const useKeyPress = (targetKey: string, config: Options = defaults) => {
  const [state, setState] = useState(false);
  const [keyboardjs, setKeyboardJs] = useState<any>(null);
  const {useKeyboardJS} = config;

  if (useKeyboardJS) {
    import("keyboardjs").then(setKeyboardJs);
  }

  const regularDownHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setState(true);
    }
  };

  const regularUpHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setState(false);
    }
  };

  const customDownHandler = () => {
    setState(true);
  };
  const customUpHandler = () => {
    setState(false);
  };

  useEffect(() => {
    if (useKeyboardJS) {
      if (keyboardjs) {
        keyboardjs.bind(targetKey, customDownHandler, customUpHandler);
      }
    } else {
      window.addEventListener("keydown", regularDownHandler);
      window.addEventListener("keyup", regularUpHandler);
    }
    return () => {
      if (useKeyboardJS) {
        if (keyboardjs) {
          keyboardjs.unbind(targetKey, customDownHandler, customUpHandler);
        }
      } else {
        window.removeEventListener("keydown", regularDownHandler);
        window.removeEventListener("keyup", regularUpHandler);
      }
    };
  }, [targetKey, useKeyPress, keyboardjs]);

  return state;
};

export default useKeyPress;
