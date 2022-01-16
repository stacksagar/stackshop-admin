import orderTypes from "../types/order.types";
import mergeUpdateOrder from "../tools/mergeUpdateOrder";
const initialState = {
  orders: null,
  error: null,
  loading: false,
  fetched: false,
};

const authReducer = (state = initialState, actions) => {
  const {type, payload} = actions;

  switch (type) {
    // get ORDERS actions
    case orderTypes.GET_ORDERS_REQUEST:
      return {...state, loading: true};
    case orderTypes.GET_ORDERS_FAILED:
      return {...state, error: payload.error, loading: false};
    case orderTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.orders,
        loading: false,
        fetched: true,
        error: null,
      };

    // update order actions
    case orderTypes.UPDATE_ORDER_REQUEST:
      return {...state, loading: true};
    case orderTypes.UPDATE_ORDER_FAILED:
      return {...state, error: payload.error, loading: false};
    case orderTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: mergeUpdateOrder(payload.updatedOrder, state.orders),
        loading: false,
        fetched: true,
        error: null,
      };

    // update order actions
    case orderTypes.UPDATE_PEYMENT_REQUEST:
      return {...state, loading: true};
    case orderTypes.UPDATE_PEYMENT_FAILED:
      return {...state, error: payload.error, loading: false};
    case orderTypes.UPDATE_PEYMENT_SUCCESS:
      return {
        ...state,
        orders: mergeUpdateOrder(payload.updatedOrder, state.orders),
        loading: false,
        fetched: true,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
