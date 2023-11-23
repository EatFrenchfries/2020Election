import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_DISTRICT, FETCH_VILLAGE } from "./types";
import { fetchDistrictSuccess, fetchVillageSuccess } from "./actions";
import {
  concatCode,
  formatAreasProfilesObj,
  formatAreasTickets,
  formatOptions,
} from "utils";
import { elections } from "client/apiEndpoint";

function* fetchDistrict(action) {
  try {
    const { code } = action;
    const state = yield select();
    const { totalCand } = state.election;
    const endpoints = [
      elections.areas("D", code),
      elections.areasTickets("D", code),
      elections.areasProfiles("D", code),
    ];
    const [options, tickets, profiles] = yield all(
      endpoints.map((endpoint) => call(axios.get, endpoint))
    );
    if (
      options.status === 200 &&
      tickets.status === 200 &&
      profiles.status === 200
    ) {
      const returnData = {
        options: formatOptions(options.data?.[code]),
        tickets: formatAreasTickets(totalCand, tickets.data?.[code]),
        profiles: formatAreasProfilesObj(profiles.data?.[code]),
      };
      yield put(fetchDistrictSuccess(returnData));
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchVillage(action) {
  try {
    const { code } = action;
    const { city, district } = code;
    const state = yield select();
    const { totalCand } = state.election;
    const endpoints = [
      elections.areas("L", city),
      elections.areasTickets("L", city),
      elections.areasProfiles("L", city),
    ];
    const [options, tickets, profiles] = yield all(
      endpoints.map((endpoint) => call(axios.get, endpoint))
    );
    if (
      options.status === 200 &&
      tickets.status === 200 &&
      profiles.status === 200
    ) {
      const returnData = {
        options: formatOptions(options.data?.[district]),
        tickets: formatAreasTickets(totalCand, tickets.data?.[district]),
        profiles: formatAreasProfilesObj(profiles.data?.[district]),
      };
      yield put(fetchVillageSuccess(returnData));
    }
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest(FETCH_DISTRICT, fetchDistrict),
  takeLatest(FETCH_VILLAGE, fetchVillage),
];
