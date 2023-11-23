import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import election from "store/election/reducer";

const combinedReducer = combineReducers({
  election,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    // server side rendered
    // This will overwrite client state! Real apps should use proper reconciliation.
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  }
  return combinedReducer(state, action);
};

export default rootReducer;
