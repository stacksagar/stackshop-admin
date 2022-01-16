import axiosInstance from "../../helpers/axiosInstance";
import categoryTypes from "../types/category.types";

const resetError = (dispatch) => {
  setTimeout(() => {
    dispatch({type: categoryTypes.RESET_ERROR});
  }, 3000);
};

export const delete_category = async (dispatch, id, setShowPopup) => {
  dispatch({type: categoryTypes.DELETE_CATEGORY_REQUEST});
  try {
    const {
      data: {success, error, deleted, categories},
    } = await axiosInstance.delete(`/api/category/delete/${id}`);
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({
      type: categoryTypes.DELETE_CATEGORY_SUCCESS,
      payload: {deleted, categories},
    });
    setShowPopup(false);
  } catch (error) {
    dispatch({
      type: categoryTypes.DELETE_CATEGORY_FAILED,
      payload: {error: error.message},
    });
    resetError(dispatch);
  }
};

export const create_category = async (dispatch, state, setShowANC) => {
  dispatch({type: categoryTypes.CREATE_CATEGORY_REQUEST});
  try {
    const {
      data: {success, error, category},
    } = await axiosInstance.post("/api/category/create", state);
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({
      type: categoryTypes.CREATE_CATEGORY_SUCCESS,
      payload: {category},
    });
    setShowANC(false);
  } catch (error) {
    dispatch({
      type: categoryTypes.CREATE_CATEGORY_FAILED,
      payload: {error: error.message},
    });
    resetError(dispatch);
  }
};

export const update_category = async (dispatch, state, setShowUC) => {
  dispatch({type: categoryTypes.UPDATE_CATEGORY_REQUEST});
  try {
    const {
      data: {success, error, category, categories},
    } = await axiosInstance.put("/api/category/update", state);
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({
      type: categoryTypes.UPDATE_CATEGORY_SUCCESS,
      payload: {category, categories},
    });
    setShowUC(false);
  } catch (error) {
    dispatch({
      type: categoryTypes.UPDATE_CATEGORY_FAILED,
      payload: {error: error.message},
    });
    resetError(dispatch);
  }
};

export const get_categories = async (dispatch) => {
  dispatch({type: categoryTypes.GET_CATEGORIES_REQUEST});
  try {
    const {
      data: {success, error, categories},
    } = await axiosInstance.get("/api/category/all");
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({
      type: categoryTypes.GET_CATEGORIES_SUCCESS,
      payload: {categories},
    });
  } catch (error) {
    dispatch({
      type: categoryTypes.GET_CATEGORIES_FAILED,
      payload: {error: error.message},
    });
    resetError(dispatch);
  }
};
