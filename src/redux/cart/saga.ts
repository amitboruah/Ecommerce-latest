import { call, put, takeEvery, fork, all } from "redux-saga/effects";
import { addToCart, orderDetails, showCart } from "../../service/auth";
import cartActions from "./action";

export function* Addproduct() {
  yield takeEvery(cartActions.ADD_TO_CART, function* (payload: any): any {
    const response = yield call(addToCart, payload.payload);
    const showCartPayload = {
      Email: payload.payload.Email,
    };

    if (response) {
      yield all([
        put({ type: cartActions.ADD_TO_CART_SUCCESS, payload: response }),
        put({ type:cartActions.SHOW_CART, payload:showCartPayload})
      ]);
      // yield put({ type: cartActions.ADD_TO_CART_SUCCESS, payload: response });
    }
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

export function* order() {
  yield takeEvery(cartActions.GET_ORDER, function* (payload: any): any {
    const response = yield call(orderDetails, payload.payload);

    if (response) {
      yield put({ type: cartActions.GET_ORDER_SUCCESS, payload: response });
    }
  });
}

export default function* cartSaga() {
  yield all([fork(Addproduct), fork(Showproduct)]);
}
