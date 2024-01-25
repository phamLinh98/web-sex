import React, { useEffect, useReducer } from "react";
// import { getGraph } from "../services/graphServices";
import { getFromRefeshData } from "./+state/effect";
import { useSelector, useDispatch } from "react-redux";
import {
  selectErrorMessager,
  selectLoadSucess,
  selectLoading,
} from "./+state/selector";

let isInitial = true;
export default function GraphControl() {
  const isLoading = useSelector(selectLoading);
  const data = useSelector(selectLoadSucess);
  const error = useSelector(selectErrorMessager);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(getFromRefeshData());
    }
  }, [dispatch]);
  return (
    <>
      {isLoading && <div>Dang Loading xin hay doi...</div>}
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
