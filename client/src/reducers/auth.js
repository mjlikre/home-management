import { AUTH_USER, AUTH_ERROR } from "../actions/types";
import { StaticRouter } from "react-router-dom";

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  username: "",
  usernameError: ""
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
