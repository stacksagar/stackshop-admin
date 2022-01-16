import productTypes from "../types/product.types";
import removeDeletedProduct from "../tools/removeDeletedProduct";
import mergeUpdatedProduct from "../tools/mergeUpdatedProduct";

const initialState = {
  products: null,
  loading: false,
  error: null,
  fetched: false,
  create_loading: false,
  create_error: null,
  delete_loading: false,
  delete_error: false,
  update_loading: false,
  update_error: false,
};
const authReducer = (state = initialState, actions) => {
  const {type, payload} = actions;

  switch (type) {
    case productTypes.RESET_ERROR:
      return {
        ...state,
        error: null,
        create_error: null,
        delete_loading: null,
        update_error: null,
      };

    // delete product actions
    case productTypes.DELETE_PRODUCT_REQUEST:
      return {...state, delete_loading: true};
    case productTypes.DELETE_PRODUCT_FAILED:
      return {...state, delete_loading: false, delete_error: payload.error};
    case productTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        delete_error: null,
        products: removeDeletedProduct(state.products, payload.deleted),
      };

    // create product actions
    case productTypes.CREATE_PRODUCT_REQUEST:
      return {...state, create_loading: true};
    case productTypes.CREATE_PRODUCT_FAILED:
      return {...state, create_loading: false, create_error: payload.error};
    case productTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_error: null,
        products: [...state.products, payload.product],
      };

    // create product actions
    case productTypes.UPDATE_PRODUCT_REQUEST:
      return {...state, update_loading: true};
    case productTypes.UPDATE_PRODUCT_FAILED:
      return {...state, update_loading: false, update_error: payload.error};
    case productTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        update_loading: false,
        update_error: null,
        products: mergeUpdatedProduct(state.products, payload.product),
      };

    // get products actions
    case productTypes.GET_PRODUCTS_REQUEST:
      return {...state, loading: true};
    case productTypes.GET_PRODUCTS_FAILED:
      return {...state, error: payload.error, loading: false};
    case productTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        loading: false,
        fetched: true,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
