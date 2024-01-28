import React, { createContext } from "react";
import Demo1 from "./Demo1";
import Demo2 from "./Demo2";
import Demo3 from "./Demo3";

export const Context = createContext();
export default function UploadPicture() {
  return (
    <Context.Provider value={{ data: "Cap phat du lieu" }}>
      <Demo1 />
      <Demo2 />
      <Demo3 />
    </Context.Provider>
  );
}
