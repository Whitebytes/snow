import {LOGON, LOGGEDON, CONNECTED, LOGOFF, LOGGEDOFF } from "../actionTypes";
import { logonStates } from "../states";


const initialState = {
    logonState: logonStates.LOGGEDOFF,
    currUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGON: {
      return {
        ...state,
        logonState:logonStates.LOGGINGON
      };
    }
   
    case LOGGEDON: {
      return {
        ...state,
        logonState:logonStates.LOGGEDON,
        currUser: action.payload
      };
    }

    case CONNECTED: {
      return {
        ...state,
        logonState: logonStates.ONLINE
      };
    }

    case LOGOFF: {
      return {
        ...state,
        logonState: logonStates.LOGOFF,
        currUser: null
      };
    }
    case LOGGEDOFF: {
      return {
        ...state,
        logonState: logonStates.LOGGEDOFF
      };
    }

    default:
      return state;
  }
}
