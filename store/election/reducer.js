import { produce } from "immer";
import {
  FETCH_DISTRICT_SUCCESS,
  FETCH_VILLAGE_SUCCESS,
  RESET_DATA,
  RESET_DISTRICT,
  RESET_VILLAGE,
  SET_TOTAL_CAND,
} from "./types";

const initData = {
  options: null,
  tickets: null,
  profiles: null,
};

export const initState = {
  totalCand: [],
  districtData: initData,
  villageData: initData,
};

const reducer = (state = initState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_DATA:
        draft.districtData = initData;
        draft.villageData = initData;
        return;
      case RESET_DISTRICT:
        draft.districtData = initData;
        return;
      case RESET_VILLAGE:
        draft.villageData = initData;
        return;
      case SET_TOTAL_CAND:
        draft.totalCand = action.totalCand;
        return;
      case FETCH_DISTRICT_SUCCESS:
        draft.districtData = action.data;
        return;
      case FETCH_VILLAGE_SUCCESS:
        draft.villageData = action.data;
        return;

      default:
        return draft;
    }
  });

export default reducer;
