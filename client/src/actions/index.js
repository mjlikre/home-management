import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";

export const signup = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/signup", data);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    localStorage.setItem("token", res.data.token);
    
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("cycleDate");
  dispatch({type: AUTH_USER, payload: null});
  return null
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/signin", formProps);
    localStorage.setItem("token", res.data.token);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  }
};
export const changePass = (formProps, callback) => async (dispatch) => {
  try {
    await axios.post("/api/auth/edit", formProps);
    callback();
  } catch (e) {
    console.log(e);
  }
};

export const test = () => async (dispatch) => {
  try {
    await axios.get("/api/test", {
      headers: { authorization: localStorage.getItem("token") },
    });
  } catch (e) {
    console.log(e);
  }
};
