import { TOGGLE_DRAWER, MENU_LOAD , MENU_LOADED } from "./actionTypes";

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER
});

export const menu_load = (content) => ({
  type: MENU_LOAD
});


export const menu_loaded = (content) => ({
  type: MENU_LOADED,
  payload: content
});