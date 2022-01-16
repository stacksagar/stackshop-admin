import axiosInstance from "../../helpers/axiosInstance";
import orderTypes from "../types/order.types";

export const get_orders = async (dispatch) => {
  dispatch({type: orderTypes.GET_ORDERS_REQUEST});
  try {
    const {
      data: {success, error, orders},
    } = await axiosInstance.get("/api/order/all");
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({type: orderTypes.GET_ORDERS_SUCCESS, payload: {orders}});
  } catch (error) {
    dispatch({
      type: orderTypes.GET_ORDERS_FAILED,
      payload: {error: error.message},
    });
  }
};

export const update_order = async (dispatch, id, type) => {
  dispatch({type: orderTypes.UPDATE_ORDER_REQUEST});
  try {
    const {
      data: {error, success, updatedOrder},
    } = await axiosInstance.put(`/api/order/${id}`, {type});
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({type: orderTypes.UPDATE_ORDER_SUCCESS, payload: {updatedOrder}});
  } catch (error) {
    dispatch({
      type: orderTypes.UPDATE_ORDER_FAILED,
      payload: {error: error.message},
    });
  }
};

export const update_order_peyment_status = async (
  dispatch,
  id,
  peymentStatus
) => {
  dispatch({type: orderTypes.UPDATE_PEYMENT_REQUEST});
  try {
    const {
      data: {error, success, updatedOrder},
    } = await axiosInstance.put(`/api/order/peymentStatus/${id}`, {
      peymentStatus,
    });
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({
      type: orderTypes.UPDATE_PEYMENT_SUCCESS,
      payload: {updatedOrder},
    });
  } catch (error) {
    dispatch({
      type: orderTypes.UPDATE_PEYMENT_FAILED,
      payload: {error: error.message},
    });
  }
};
