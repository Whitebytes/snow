import { TOGGLE_DRAWER } from "../actionTypes";

const initialState = {
    open: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER: {
      return {
        ...state,
        open: !state.open
      };
    }
    default:
      return state;
  }
}
