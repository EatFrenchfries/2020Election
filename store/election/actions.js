import {
  FETCH_DISTRICT_SUCCESS,
  FETCH_DISTRICT,
  RESET_DATA,
  SET_TOTAL_CAND,
  FETCH_VILLAGE,
  FETCH_VILLAGE_SUCCESS,
  RESET_DISTRICT,
  RESET_VILLAGE,
  FETCH_DISTRICT_FAIL,
  FETCH_VILLAGE_FAIL,
} from "./types";

export const setTotalCand = (totalCand) => ({
  type: SET_TOTAL_CAND,
  totalCand,
});

export const resetData = () => ({
  type: RESET_DATA,
});

export const resetDistirct = () => ({
  type: RESET_DISTRICT,
});

export const resetVillage = () => ({
  type: RESET_VILLAGE,
});

export const fetchDistrict = (code) => ({
  type: FETCH_DISTRICT,
  code,
});

export const fetchDistrictSuccess = (data) => ({
  type: FETCH_DISTRICT_SUCCESS,
  data,
});

export const fetchDistrictFail = () => ({
  type: FETCH_DISTRICT_FAIL,
});

export const fetchVillage = (code) => ({
  type: FETCH_VILLAGE,
  code,
});

export const fetchVillageSuccess = (data) => ({
  type: FETCH_VILLAGE_SUCCESS,
  data,
});

export const fetchVillageFail = () => ({
  type: FETCH_VILLAGE_FAIL,
});
