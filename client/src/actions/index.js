import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";

export const signup = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/signup", data);
    console.log("got here");
    dispatch({ type: AUTH_USER, payload: res.data.token });
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("token", res.data.token);
    
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signout = () => {
  axios.post("/api/auth/logout", {refreshToken: localStorage.getItem("refreshToken")})
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  
  return {
    type: AUTH_USER,
    payload: null,
  };
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/signin", formProps);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    callback();
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH_ERROR, payload: e });
  }
};
export const changePass = (formProps, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/edit", formProps);
    callback();
  } catch (e) {
    console.log(e);
  }
};
export const refreshToken = (callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/auth/refreshaccess",
      {refreshToken: localStorage.getItem("refreshToken")}
    );
    console.log(res.data)
    localStorage.setItem("token", res.data.accessToken);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    callback();
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_ERROR, payload: error });
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
