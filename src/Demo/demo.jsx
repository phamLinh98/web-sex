import React from "react";

export default function DemoState({ count, getFunc = () => {} }) {
  return (
    <>
      <div>{count}</div>
      <div>{getFunc()}</div>
    </>
  );
}
