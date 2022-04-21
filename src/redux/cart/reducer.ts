import cartActions from "./action";

const initialValue = {
  Cart: [],
  total: "",
  quantity: [],
  order: [],
};

const cartReducers = (state = initialValue, action: any) => {
  switch (action.type) {
    case cartActions.ADD_TO_CART_SUCCESS:
      // console.log(action.payload.quantity, "from reducer");

      return {
        ...state,
        quantity: action.payload.quantity,
      };

    case cartActions.SHOW_CART:
      return {
        ...initialValue,
      };

    case cartActions.SHOW_CART_SUCCESS:
      return {
        ...state,
        Cart: action.payload,
      };

    // case cartActions.SHOW_CART_SUCCESS:
    //   return {
    //     ...state,
    //     order: action.payload,
    //   };

    default:
      return state;
  }
};

export default cartReducers;
