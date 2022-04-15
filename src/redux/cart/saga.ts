import { call, put, takeEvery, fork, all } from "redux-saga/effects";
import { addToCart, showCart } from "../../service/auth";
import cartActions from "./action";

export function* Addproduct() {
  yield takeEvery(cartActions.ADD_TO_CART, function* (payload: any): any {
  yield call(addToCart, payload.payload);

    // if (response) {
    //   yield put({ type: actions.ADD_TO_CART_SUCCESS, payload: response });
    // }
  });
}

export function* Showproduct() {
  yield takeEvery(cartActions.SHOW_CART, function* (payload: any): any {
    const response = yield call(showCart, payload.payload);

    if (response) {
      yield put({ type: cartActions.SHOW_CART_SUCCESS, payload: response });
    }
  });
}
export default function* cartSaga() {
  yield all([fork(Addproduct), fork(Showproduct)]);
}