import { combineReducers } from "redux";
import menu from "./menu";
import buObjects from "./BuObjects";
import logon from "./logon";

export default combineReducers({ menu, buObjects, logon});
