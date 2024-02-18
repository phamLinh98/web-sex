import React from "react";
import InputComponent from "./InputComponent";
import DisplayComponent from "./DisplayComponent";
import { useCustomHookState } from "./CreateCustomHookState";
export default function ExampleContainer() {
  const [state, setState] = useCustomHookState("Linh khoai to");
  return (
    <div>
      <DisplayComponent value={state} />
      <InputComponent onChange={setState} />
    </div>
  );
}
