import {
  selectErrorMessager,
  selectLoading,
  selectLoadSucess,
} from "./selector.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFromRefeshData } from "./effect.js";
let isInitial = true;
export default function useFacade() {
  const data = useSelector(selectLoadSucess);
  const waitData = useSelector(selectLoading);
  const error = useSelector(selectErrorMessager);
  const dispatch = useDispatch();
  const add = "";
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(getFromRefeshData());
    }
  }, [dispatch]);

  return {
    add,
    data: data,
    waitData,
    error,
    // loadData: () => getFromRefeshData(),
    // addData: (title) => dispatch(createData({ title })),
  };
}
