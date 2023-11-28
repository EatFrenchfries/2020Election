import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { FETCH_CITY, FETCH_DISTRICT, FETCH_VILLAGE } from "./types";
import {
  fetchCityFail,
  fetchCitySuccess,
  fetchDistrictFail,
  fetchDistrictSuccess,
  fetchVillageFail,
  fetchVillageSuccess,
  setTotalCand,
} from "./actions";
import {
  formatAreasProfilesObj,
  formatAreasTickets,
  formatOptions,
  formatYearToId,
  partyColor,
} from "utils";
import { elections } from "client/apiEndpoint";

function* fetchDistrict(action) {
  try {
    const { code } = action;
    const state = yield select();
    const { totalCand, year } = state.election;
    const id = formatYearToId(year);
    const endpoints = [
      elections.areas(id, "D", code),
      elections.areasTickets(id, "D", code),
      elections.areasProfiles(id, "D", code),
    ];
    const [options, tickets, profiles] = yield all(
      endpoints.map((endpoint) => call(axios.get, endpoint))
    );
    if (
      options.status === 200 &&
      tickets.status === 200 &&
      profiles.status === 200 &&
      options.data?.[code]?.length > 0 &&
      tickets.data?.[code]?.length > 0 &&
      profiles.data?.[code]?.length > 0
    ) {
      const returnData = {
        options: formatOptions(options.data?.[code]),
        tickets: formatAreasTickets(totalCand, tickets.data?.[code]),
        profiles: formatAreasProfilesObj(profiles.data?.[code]),
      };
      yield put(fetchDistrictSuccess(returnData));
    } else {
      yield put(fetchDistrictFail());
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDistrictFail());
  }
}

function* fetchVillage(action) {
  try {
    const { code } = action;
    const { city, district } = code;
    const state = yield select();
    const { totalCand, year } = state.election;
    const id = formatYearToId(year);
    const endpoints = [
      elections.areas(id, "L", city),
      elections.areasTickets(id, "L", city),
      elections.areasProfiles(id, "L", city),
    ];
    const [options, tickets, profiles] = yield all(
      endpoints.map((endpoint) => call(axios.get, endpoint))
    );
    if (
      options.status === 200 &&
      tickets.status === 200 &&
      profiles.status === 200 &&
      options.data?.[district]?.length > 0 &&
      tickets.data?.[district]?.length > 0
    ) {
      const returnData = {
        options: formatOptions(options.data?.[district]),
        tickets: formatAreasTickets(totalCand, tickets.data?.[district]),
        profiles: formatAreasProfilesObj(profiles.data?.[district]),
      };
      yield put(fetchVillageSuccess(returnData));
    } else {
      yield put(fetchVillageFail());
    }
  } catch (error) {
    console.log(error);
    yield put(fetchVillageFail());
  }
}

function* fetchCity(action) {
  try {
    const { year } = action;
    let returnData = { props: {} };
    let id = formatYearToId(year);
    let code = "00_000_00_000_0000";
    const endpoints = [
      elections.ticketProfiles(id, "N", code),
      elections.partyData(id, "N", code),
      elections.areas(id, "C", code),
      elections.areasTickets(id, "C", code),
      elections.areasProfiles(id, "C", code),
    ];
    const results = yield all(
      endpoints.map((endpoint) => call(axios.get, endpoint))
    );
    const ticketProfiles = results[0].data?.[code];
    const partyTickets = results[1].data?.[code];
    const citys = results[2].data?.[code];
    const citysTickets = results[3].data?.[code];
    const citysProfiles = results[4].data?.[code];
    if (
      !partyTickets ||
      !citys ||
      !citysTickets ||
      !ticketProfiles ||
      !citysProfiles
    ) {
      yield put(fetchCityFail());
    } else {
      let partyData = [];
      for (let i = 0; i < partyTickets.length / 2; i++) {
        const { party_name, ticket_num, cand_no, ticket_percent } =
          partyTickets[2 * i];
        const temp = {
          party_name,
          member: `${partyTickets[2 * i].cand_name}｜${
            partyTickets[2 * i + 1].cand_name
          }`,
          value: ticket_num,
          cand_no,
          ticket_percent,
        };
        partyData.push(temp);
      }
      let cityOptions = formatOptions(citys);
      const totalCand = partyData.map((v) => {
        const { party_name, member, cand_no } = v;
        return {
          party_name,
          member,
          cand_no,
          // partyColor: partyColor(party_name),
        };
      });
      let sortedCitysTickets = formatAreasTickets(totalCand, citysTickets);
      let citysProfilesObj = formatAreasProfilesObj(citysProfiles);

      returnData = {
        ticketProfiles,
        partyData,
        cityOptions,
        sortedCitysTickets,
        citysProfilesObj,
        totalCand,
        year,
      };
      yield put(fetchCitySuccess(returnData));
      yield put(setTotalCand(totalCand));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchCityFail());
  }
}

export default [
  takeLatest(FETCH_DISTRICT, fetchDistrict),
  takeLatest(FETCH_VILLAGE, fetchVillage),
  takeLatest(FETCH_CITY, fetchCity),
];
