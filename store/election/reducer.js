import { produce } from "immer";
import {
  FETCH_DISTRICT,
  FETCH_DISTRICT_FAIL,
  FETCH_DISTRICT_SUCCESS,
  FETCH_VILLAGE,
  FETCH_VILLAGE_FAIL,
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
  fetchDistrictFail: false,
  fetchVillageFail: false,
};

const reducer = (state = initState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_DATA:
        draft.districtData = initData;
        draft.villageData = initData;
        draft.fetchDistrictFail = false;
        draft.fetchVillageFail = false;
        return;
      case RESET_DISTRICT:
        draft.districtData = initData;
        draft.fetchDistrictFail = false;
        return;
      case RESET_VILLAGE:
        draft.villageData = initData;
        draft.fetchVillageFail = false;
        return;
      case SET_TOTAL_CAND:
        draft.totalCand = action.totalCand;
        return;
      case FETCH_DISTRICT:
        draft.fetchDistrictFail = false;
        return;
      case FETCH_DISTRICT_SUCCESS:
        draft.districtData = action.data;
        return;
      case FETCH_DISTRICT_FAIL:
        draft.fetchDistrictFail = true;
        return;
      case FETCH_VILLAGE:
        draft.fetchVillageFail = false;
        return;
      case FETCH_VILLAGE_SUCCESS:
        draft.villageData = action.data;
        return;
      case FETCH_VILLAGE_FAIL:
        draft.fetchVillageFail = true;
        return;

      default:
        return draft;
    }
  });

export default reducer;
