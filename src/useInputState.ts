import { useState } from "react";

type EventWithTargetValue = { target: { value: string } };
const toEventTargetValue = (event: EventWithTargetValue) => {
  return event.target.value;
};

export const useInputState = (
  initialState: string
): [string, (event: EventWithTargetValue) => void] => {
  const [state, setState] = useState(initialState);
  const setStateFromEvent = (event: EventWithTargetValue) => setState(toEventTargetValue(event));
  return [state, setStateFromEvent];
};
