import { useEffect, useState } from 'react';
import { Spring, SpringSystem } from 'rebound';

const useSpring = (targetValue: number = 0, tension: number = 50, friction: number = 3) => {
  const [spring, setSpring] = useState<Spring | null>(null);
  const [value, setValue] = useState<number>(targetValue);

  useEffect(() => {
    const listener = {
      onSpringUpdate: currentSpring => {
        const newValue = currentSpring.getCurrentValue();
        setValue(newValue);
      },
    };

    if (!spring) {
      const newSpring = new SpringSystem().createSpring(tension, friction);
      newSpring.setCurrentValue(targetValue);
      setSpring(newSpring);
      newSpring.addListener(listener);
      return;
    }

    return () => {
      spring.removeListener(listener);
      setSpring(null);
    };
  }, [tension, friction]);

  useEffect(() => {
    if (spring) {
      spring.setEndValue(targetValue);
    }
  }, [targetValue]);

  return value;
};

export default useSpring;
