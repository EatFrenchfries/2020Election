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
