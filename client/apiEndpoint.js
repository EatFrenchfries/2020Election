export const elections = {
  ticketProfiles: (type, code) =>
    `https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/${type}/${code}.json`,
  partyData: (type, code) =>
    `https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/${type}/${code}.json`,
  areas: (type, code) =>
    `https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/${type}/${code}.json`,
  areasTickets: (type, code) =>
    `https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/${type}/${code}.json`,
  areasProfiles: (type, code) =>
    `https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/${type}/${code}.json`,
};
