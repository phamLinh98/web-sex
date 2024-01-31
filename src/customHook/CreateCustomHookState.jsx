import { useState } from "react";

export function useCustomHookState(initValue) {
  const [state, setState] = useState(initValue);
  const handleInputChange = (newValue) => {
    setState(newValue);
  };
  return [state, handleInputChange];
}
