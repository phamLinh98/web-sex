import React, { useContext } from "react";
import { Context } from "./uploadPicture";
export default function Demo1() {
  const getData = useContext(Context);
  return <>{getData.data}</>;
}
