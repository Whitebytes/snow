import { MENU_LOAD, MENU_LOADED, TOGGLE_DRAWER, MENU_CLICK, MODULE_SELECT, MENU_SELECT,MENU_CHANGED } from "../actionTypes";
import { loadingStates } from "../states";


const initialState = {
    modules: [],
    drawerOpen: true,
    menuState:loadingStates.UNLOADED,
    selectedMenu: null,
    selectedModule: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MENU_LOAD: {
      return {
        ...state,
        menuState:loadingStates.LOADING
      };
    }
   
    case MENU_LOADED: {
      return {
        ...state,
        menuState:loadingStates.LOADED,
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
    case MENU_CHANGED: {
      return {
        ...state,
        menuState:loadingStates.LOADING
      };
    }
    case MENU_SELECT: {
      return {
        ...state,
        selectedMenu: action.payload
      };
    }
    case MODULE_SELECT: {
      return {
        ...state,
        selectedModule: action.payload
      };
    }

    default:
      return state;
  }
}
