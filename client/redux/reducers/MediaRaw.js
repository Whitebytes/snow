import { GQL_LOAD,GQL_LOADED} from "../actionTypes";
import { loadingStates } from "../states";


const initialState = {
    records: [],
    loadState:loadingStates.UNLOADED,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GQL_LOAD: {
      return {
        ...state,
        loadState:loadingStates.LOADING
      };
    }
   
    case GQL_LOADED: {
      return {
        ...state,
        loadState:loadingStates.LOADED,
        records: action.payload
      };
    }

    default:
      return state;
  }
}
