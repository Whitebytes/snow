import { 
  TOGGLE_DRAWER, 
  MENU_LOAD , 
  MENU_LOADED, 
  MENU_CLICK, 
  MENU_SELECT, MENU_CHANGED,
  MODULE_SELECT, 
  DATA_CHANGED,
  DATA_SYNCED,
  BUO_LOAD, 
  BUO_LOADED,

  LOGON, LOGGEDON, CONNECTED, LOGOFF, LOGGEDOFF
} from "./actionTypes";

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

export const menuChanged = (content) => ({
  type: MENU_CHANGED,
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


export const data_changed = (content) => ({
  type: DATA_CHANGED,
  payload: content
});

export const data_synced = (content) => ({
  type: DATA_SYNCED,
  payload: content
});

export const logon = () => ({
  type: LOGON
});

export const loggedon = (content) => ({
  type: LOGGEDON,
  payload: content
});
export const connected = (content) => ({
  type: CONNECTED
});
export const logoff = (content) => ({
  type: LOGOFF
});
export const loggedoff = (content) => ({
  type: LOGGEDOFF
});