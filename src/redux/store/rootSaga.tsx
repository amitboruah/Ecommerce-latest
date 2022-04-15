import { all } from "redux-saga/effects";
import authSaga from "../auth/saga";
import cartSaga from "../cart/saga";
import productSaga from "../product/saga";

export default function* rootSaga() {
  yield all([productSaga() , authSaga() , cartSaga()]);
}
