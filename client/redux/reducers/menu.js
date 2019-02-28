import { MENU_LOAD, MENU_LOADED } from "../actionTypes";
import { loadingStates } from "../states";

const initialState = {
    modules: [],
    loadState:loadingStates.UNLOADED
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
    default:
      return state;
  }
}
