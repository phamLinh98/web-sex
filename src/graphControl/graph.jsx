import React from "react";
import useFacade from "./+state/facade";
export default function GraphControl() {
  const { data, waitData, error } = useFacade();
  return (
    <>
      {waitData && <div>Dang Loading xin hay doi...</div>}
      {error && <div>{error}</div>}
      {data ? (
        <div>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
