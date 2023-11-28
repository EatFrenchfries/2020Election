export const elections = {
  ticketProfiles: (id, type, code) =>
    `https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(
      Date.now() / 1000
    )}`,
  partyData: (id, type, code) =>
    `https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(
      Date.now() / 1000
    )}`,
  areas: (id, type, code) =>
    `https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(
      Date.now() / 1000
    )}`,
  areasTickets: (id, type, code) =>
    `https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(
      Date.now() / 1000
    )}`,
  areasProfiles: (id, type, code) =>
    `https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/${id}/${type}/${code}.json?_t=${parseInt(
      Date.now() / 1000
    )}`,
};
