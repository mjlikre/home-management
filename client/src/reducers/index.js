import { combineReducers } from "redux";
import auth from './auth';
import operations from "./operations"

export default combineReducers({
  auth,
  operations

});