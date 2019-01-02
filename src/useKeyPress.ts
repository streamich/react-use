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
  const { useKeyboardJS } = config;

  let keyboardjs;

  if (useKeyboardJS) {
    import("keyboardjs").then(module => {
      keyboardjs = module;
    });
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
      keyboardjs.bind(targetKey, customDownHandler, customUpHandler);
    } else {
      window.addEventListener("keydown", regularDownHandler);
      window.addEventListener("keyup", regularUpHandler);
    }
    return () => {
      if (useKeyboardJS) {
        keyboardjs.unbind(targetKey, customDownHandler, customUpHandler);
      } else {
        window.removeEventListener("keydown", regularDownHandler);
        window.removeEventListener("keyup", regularUpHandler);
      }
    };
  }, [targetKey, useKeyPress]);

  return state;
};

export default useKeyPress;
