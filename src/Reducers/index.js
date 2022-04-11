import selectedProduct from "./selectedProduct";
import basket from "./basket";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    selectedProduct,
    basket,
});

export default allReducers;