export const cartActions = {
  ADD_TO_CART: "ADD_TO_CART",
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",

  SHOW_CART: "SHOW_CART",
  SHOW_CART_SUCCESS: "SHOW_CART_SUCCESS",

  GET_ORDER:"GET_ORDER",
  GET_ORDER_SUCCESS:"GET_ORDER_SUCCESS",


  addToCart: (payload: any) => ({
    type: cartActions.ADD_TO_CART,
    payload: payload,
  }),

  ShowCart: (payload: any) => ({
    type: cartActions.SHOW_CART,
    payload: payload,
  }),
  getorder: (payload: any) => ({
    type: cartActions.GET_ORDER,
    payload: payload,
  }),
};

export default cartActions;
