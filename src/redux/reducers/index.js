import {combineReducers} from "redux";
import authReducer from "./auth.reducer";
import productsReducer from "./product.reducer";
import categoriesReducer from "./category.reducer";
import orderReducer from "./order.reducer";
const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoriesReducer,
  order: orderReducer,
});
export default rootReducer;
