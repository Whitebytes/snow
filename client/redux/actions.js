import { TOGGLE_DRAWER, MENU_LOAD , MENU_LOADED, MENU_CLICK, MENU_SELECT, 
  MODULE_SELECT, GQL_LOAD, GQL_LOADED, BUO_LOAD, BUO_LOADED } from "./actionTypes";

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

export const menuClick = (content) => ({
  type: MENU_CLICK,
  payload: content
});
export const menuSelect = (content) => ({
  type: MENU_SELECT,
  payload: content
});
export const moduleSelect = (content) => ({
  type: MODULE_SELECT,
  payload: content
});


export const gql_load = (content) => ({
  type: GQL_LOAD
});


export const gql_received = (content) => ({
  type: GQL_LOADED,
  payload: content
});
export const buo_load = (content) => ({
  type: BUO_LOAD,
  payload: content
});


export const buo_received = (content) => ({
  type: BUO_LOADED,
  payload: content
});