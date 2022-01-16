import categoryTypes from "../types/category.types";
import buildNewCategories from "../tools/buildNewCategories";
const initialState = {
  categories: null,
  loading: null,
  error: null,
  fetched: false,
  create_loading: false,
  create_error: false,

  update_loading: false,
  update_error: false,
};

const authReducer = (state = initialState, actions) => {
  const {type, payload} = actions;

  switch (type) {
    // delete category actions
    case categoryTypes.DELETE_CATEGORY_REQUEST:
      return {...state, delete_loading: true};
    case categoryTypes.DELETE_CATEGORY_FAILED:
      return {...state, delete_loading: false, delete_error: payload.error};
    case categoryTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        delete_loading: false,
        categories: payload.categories,
      };

    // create category actions
    case categoryTypes.CREATE_CATEGORY_REQUEST:
      return {...state, create_loading: true};
    case categoryTypes.CREATE_CATEGORY_FAILED:
      return {...state, create_loading: false, create_error: payload.error};
    case categoryTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        create_loading: false,
        create_error: null,
        categories: buildNewCategories(state.categories, payload.category),
        fetched: true,
      };

    // update category actions
    case categoryTypes.UPDATE_CATEGORY_REQUEST:
      return {...state, update_loading: true};
    case categoryTypes.UPDATE_CATEGORY_FAILED:
      return {...state, update_loading: false, update_error: payload.error};
    case categoryTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        update_loading: false,
        update_error: null,
        categories: payload.categories,
      };

    // get categories actions
    case categoryTypes.GET_CATEGORIES_REQUEST:
      return {...state, loading: true};

    case categoryTypes.GET_CATEGORIES_FAILED:
      return {...state, loading: false, error: payload.error};

    case categoryTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: payload.categories,
        fetched: true,
      };

    case categoryTypes.RESET_ERROR:
      return {
        ...state,
        error: null,
        create_error: null,
        delete_error: null,
        update_error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
