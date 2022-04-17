import { combineReducers } from "redux";
import authReducer from "../auth/reducer";
import productReducers from "../product/reducer"
import cartReducers from "../cart/reducer"



const rootReducer = combineReducers({prodlist: productReducers,authReducer, cartReducers})

export default rootReducer