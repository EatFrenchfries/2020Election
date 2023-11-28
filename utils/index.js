const PARTYCOLORS = ["#DFA175", "#8894D8", "#84CB98", "#B0B0B0"];
const PARTY_DETAIL_COLOR = [
  { backgroundColor: "#FAF1EA", borderColor: "#DFA175" },
  { backgroundColor: "#EDEFF9", borderColor: "#8894D8" },
  { backgroundColor: "#EDF7F0", borderColor: "#84CB98" },
  { backgroundColor: "#DEE0E4", borderColor: "#262E49" },
];
const PARTYHOVERCOLORS = ["#C99169", "#7A85C2", "#77B789", "#BCBEC7"];
const PARTYCHOOSECOLORS = [
  {
    fill: "#B2815E",
    stroke: "#DFA175",
    strokeWidth: "3",
  },
  {
    fill: "#6D76AD",
    stroke: "#8894D8",
    strokeWidth: "3",
  },
  {
    fill: "#6AA27A",
    stroke: "#84CB98",
    strokeWidth: "3",
  },
  {
    fill: "#BCBEC7",
    stroke: "#262E49",
    strokeWidth: "2",
  },
];

export const formatPrice = (price) =>
  price && (String(price) || 0).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");

export const concatCode = (area) => {
  const { prv_code, city_code, area_code, dept_code, li_code } = area;
  return `${prv_code}_${city_code}_${area_code}_${dept_code}_${li_code}`;
};

export const formatOptions = (options) => {
  return options.map((option) => {
    return {
      ...option,
      value: concatCode(option),
    };
  });
};

export const formatAreasTickets = (totalCand, areasTickets) => {
  let sortedAreasTickets = {};
  for (let i = 0; i < areasTickets.length / 2; i++) {
    const item = areasTickets[2 * i];
    const { ticket_num, ticket_percent } = item;
    if (sortedAreasTickets[concatCode(item)]) {
      sortedAreasTickets[concatCode(item)].push({
        ...totalCand[i % totalCand.length],
        value: ticket_num,
        ticket_percent,
      });
    } else {
      sortedAreasTickets[concatCode(item)] = [
        {
          ...totalCand[i % totalCand.length],
          value: ticket_num,
          ticket_percent,
        },
      ];
    }
  }
  return sortedAreasTickets;
};

export const formatAreasProfilesObj = (areaProfiles) => {
  let areaProfilesObj = {};
  areaProfiles.forEach((v) => {
    areaProfilesObj[concatCode(v)] = v;
  });
  return areaProfilesObj;
};

export const formatYearToId = (year) => {
  switch (year) {
    case 2020:
      return "1f7d9f4f6bfe06fdaf4db7df2ed4d60c";
    case 2016:
      return "61b4dda0ebac3332203ef3729a9a0ada";
    case 2012:
      return "fddf766f2a250a2e3688d644fda346d2";
    case 2008:
      return "54deeba50d3cc135f45018059c0cb062";
    case 2004:
      return "38b0ef91b5866696f58891ecf69cb3c7";
    case 2000:
      return "bc69efc4ab84479137e749aac2078116";
    case 1996:
      return "c818e628012243a0ea7eb3c3c3b81565";

    default:
      return "1f7d9f4f6bfe06fdaf4db7df2ed4d60c";
  }
};

export const partyColor = (partyName) => {
  switch (partyName) {
    case "親民黨":
      return {
        color: PARTYCOLORS[0],
        detailColor: PARTY_DETAIL_COLOR[0],
        hoverColor: PARTYHOVERCOLORS[0],
        chooseColor: PARTYCHOOSECOLORS[0],
      };
    case "中國國民黨":
      return {
        color: PARTYCOLORS[1],
        detailColor: PARTY_DETAIL_COLOR[1],
        hoverColor: PARTYHOVERCOLORS[1],
        chooseColor: PARTYCHOOSECOLORS[1],
      };
    case "民主進步黨":
      return {
        color: PARTYCOLORS[2],
        detailColor: PARTY_DETAIL_COLOR[2],
        hoverColor: PARTYHOVERCOLORS[2],
        chooseColor: PARTYCHOOSECOLORS[2],
      };

    default:
      return {
        color: PARTYCOLORS[3],
        detailColor: PARTY_DETAIL_COLOR[3],
        hoverColor: PARTYHOVERCOLORS[3],
        chooseColor: PARTYCHOOSECOLORS[3],
      };
  }
};

export const switchCity = (year, name) => {
  switch (name) {
    case "桃園市":
      if (year < 2014) return "桃園縣";
      else return "桃園市";
    case "新北市":
      if (year < 2010) return "臺北縣";
      else return "新北市";

    default:
      return name;
  }
};
