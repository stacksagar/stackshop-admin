import authTypes from "../types/auth.types";
const initialState = {
  user: null,
  error: null,
  authenticated: false,
  loading: false,
};
const authReducer = (state = initialState, actions) => {
  const {type, payload} = actions;

  switch (type) {
    case authTypes.SIGNIN_REQUEST:
      return {...state, loading: true};

    case authTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: payload.user,
        error: null,
      };

    case authTypes.SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: null,
        error: payload.error,
      };

    case authTypes.SIGNUP_REQUEST:
      return {...state, loading: true};

    case authTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: payload.user,
        error: null,
      };

    case authTypes.SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: null,
        error: payload.error,
      };

    case authTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
