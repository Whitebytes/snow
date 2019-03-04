import { MENU_LOAD, MENU_LOADED, TOGGLE_DRAWER, MENU_CLICK, MODULE_CLICK } from "../actionTypes";
import { loadingStates } from "../states";


const path = () =>{
  if (typeof(window)!='undefined'){
    return window.location.pathname;
  }
}

const initialState = {
    modules: [],
    drawerOpen: true,
    loadState:loadingStates.UNLOADED,
    selectedMenu: null,
    selectedModule:path()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MENU_LOAD: {
      return {
        ...state,
        loadState:loadingStates.LOADING
      };
    }
   
    case MENU_LOADED: {
      return {
        ...state,
        loadState:loadingStates.LOADED,
        modules: action.payload
      };
    }

    case TOGGLE_DRAWER: {
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      };
    }

    case MENU_CLICK: {
      return {
        ...state,
        selectedMenu: action.payload
      };
    }
    case MODULE_CLICK: {
      return {
        ...state,
        selectedModule: action.payload
      };
    }

    default:
      return state;
  }
}
