import { combineReducers } from "redux";
import auth from "./auth";
import profiles from "./profiles";
import orders from "./orders";
import errors from "./errors";
import financeiro from "./financeiro";

export default combineReducers({
  auth,
  profiles,
  orders,
  errors,
  financeiro,
});
