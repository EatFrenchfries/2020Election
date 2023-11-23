import { all } from "redux-saga/effects";
import electionSagas from "store/election/sagas";

function* rootSaga() {
  yield all([...electionSagas]);
}

export default rootSaga;
