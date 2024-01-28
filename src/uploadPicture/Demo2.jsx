import React from "react";
import { useContext } from "react";
import { Context } from "./uploadPicture";
export default function Demo2() {
  const getData = useContext(Context);
  return <>{getData.data}</>;
}
