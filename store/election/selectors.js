import { createSelector } from "reselect";

const election = (state) => state.election;
export default createSelector([election], (election) => election);
