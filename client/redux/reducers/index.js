import { combineReducers } from "redux";
import menu from "./menu";
import mediaRaw from "./MediaRaw";
import buObjects from "./BuObjects";

export default combineReducers({ mediaRaw,  menu, buObjects});
