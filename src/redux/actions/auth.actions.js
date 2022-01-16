import authTypes from "../types/auth.types";
import axiosInstance from "../../helpers/axiosInstance";
export const signin_start = async (dispatch, state) => {
  dispatch({type: authTypes.SIGNIN_REQUEST});
  try {
    const {
      data: {user, success, error, token},
    } = await axiosInstance.post("/api/auth/admin/signin", state);
    if (error || !success) throw new Error(error || "something wrong");
    dispatch({type: authTypes.SIGNIN_SUCCESS, payload: {user}});
    localStorage.setItem("token", token);
  } catch (error) {
    dispatch({type: authTypes.SIGNIN_FAILED, payload: {error: error.message}});
  }
};

export const signup_start = async (dispatch, state) => {
  dispatch({type: authTypes.SIGNUP_REQUEST});
  try {
    const {
      data: {user, success, error, token},
    } = await axiosInstance.post("/api/auth/admin/signup", {
      ...state,
      role: "admin",
    });
    if (error || !success) throw new Error(error || "something wrong");
    dispatch({type: authTypes.SIGNUP_SUCCESS, payload: {user}});
    localStorage.setItem("token", token);
  } catch (error) {
    dispatch({type: authTypes.SIGNUP_FAILED, payload: {error: error.message}});
  }
};

export const logout_start = (dispatch) => {
  dispatch({type: authTypes.LOGOUT});
  localStorage.clear();
};

export const checking_start = async (dispatch) => {
  if (!localStorage.getItem("token")) return;
  try {
    const {
      data: {user, success, error},
    } = await axiosInstance.get("/api/auth/admin/user");
    if (error || !success) throw new Error(error || "something wrong");
    dispatch({type: authTypes.SIGNIN_SUCCESS, payload: {user}});
  } catch (error) {
    dispatch({type: authTypes.SIGNIN_FAILED, payload: {error: error.message}});
  }
};
