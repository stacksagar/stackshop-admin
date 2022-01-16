import axiosInstance from "../../helpers/axiosInstance";
import productTypes from "../types/product.types";

const resetError = (dispatch) => {
  setTimeout(() => {
    dispatch({type: productTypes.RESET_ERROR});
  }, 3000);
};

export const get_products = async (dispatch) => {
  dispatch({type: productTypes.GET_PRODUCTS_REQUEST});
  try {
    const {
      data: {success, error, products},
    } = await axiosInstance.get("/api/product");
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({type: productTypes.GET_PRODUCTS_SUCCESS, payload: {products}});
  } catch (error) {
    dispatch({
      type: productTypes.GET_PRODUCTS_FAILED,
      payload: {error: error.message},
    });
    resetError(dispatch);
  }
};

export const delete_product = async (dispatch, id) => {
  dispatch({type: productTypes.DELETE_PRODUCT_REQUEST});
  try {
    const {
      data: {success, error, deleted},
    } = await axiosInstance.delete(`/api/product/delete/${id}`);
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({type: productTypes.DELETE_PRODUCT_SUCCESS, payload: {deleted}});
  } catch (error) {
    dispatch({
      type: productTypes.DELETE_PRODUCT_FAILED,
      payload: {error: error.message},
    });
    resetError(dispatch);
  }
};

export const add_product = async (dispatch, formData, setShowANP) => {
  dispatch({type: productTypes.CREATE_PRODUCT_REQUEST});
  try {
    const {
      data: {error, success, product},
    } = await axiosInstance.post("/api/product/create", formData);
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({type: productTypes.CREATE_PRODUCT_SUCCESS, payload: {product}});
    setShowANP(false);
  } catch (error) {
    dispatch({
      type: productTypes.CREATE_PRODUCT_FAILED,
      payload: {error: error.message},
    });
    resetError(dispatch);
  }
};

export const update_product = async (dispatch, formData, setShowUP, id) => {
  dispatch({type: productTypes.UPDATE_PRODUCT_REQUEST});
  try {
    const {
      data: {error, success, product},
    } = await axiosInstance.put(`/api/product/update/${id}`, formData);
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({type: productTypes.UPDATE_PRODUCT_SUCCESS, payload: {product}});
    setShowUP(false);
  } catch (error) {
    dispatch({
      type: productTypes.UPDATE_PRODUCT_FAILED,
      payload: {error: error.message},
    });
    resetError(dispatch);
  }
};
