import { combineReducers } from "redux";
import auth from './auth';
import operations from "./operations"
import inventory from "./inventory"

export default combineReducers({
  auth,
  operations,
  inventory

});