import { BUO_LOAD,BUO_LOADED} from "../actionTypes";
import { loadingStates } from "../states";


const initialState = {
   
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BUO_LOAD: {
      let table = {}
      table[action.payload.name] =
      {
        records:[], 
        query:action.payload.query,
        state: loadingStates.LOADING
      }
      return {
        ...state,
        ...table
      };
    }
   
    case BUO_LOADED: {

      let table = {}
      table[action.payload.name] =
      {
        records:action.payload.records, 
        state: loadingStates.LOADED
      }

      return {
        ...state,
        ...table
      };
    }

    default:
      return state;
  }
}
