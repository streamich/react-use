import * as React from 'react';

const {useState, useEffect} = React;

// kudos: https://usehooks.com
const useKeyPress = (targetKey: string) => {
  const [state, setState] = useState(false);

  const downHandler = ({key}: KeyboardEvent) => {
    if (key === targetKey) {
      setState(true);
    }
  }
  const upHandler = ({key}: KeyboardEvent) => {
    if (key === targetKey) {
      setState(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return state;
}

export default useKeyPress;
