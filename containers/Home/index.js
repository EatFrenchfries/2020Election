import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDistrict,
  resetData,
  fetchVillage,
  resetVillage,
} from "store/election/actions";
import getElection from "store/election/selectors";

import Select from "components/Select";
import Map from "components/Map";
import DisabledBox from "components/DisabledBox";
import TabBar from "components/TabBar";
import Slider from "components/Slider";

import Rotate from "public/images/rotate-cw.svg";
import Right from "public/images/chevron-right.svg";
import Down from "public/images/chevron-down.svg";
import Info from "public/images/info.svg";
import Tip1 from "public/images/tip1.svg";
import Tip2 from "public/images/tip2.svg";

import styles from "./index.module.scss";
import { formatPrice, partyColor } from "utils";

const COLORS = ["#262E49", "#CCCCCC"];

const Home = () => {
  const {
    districtData,
    villageData,
    fetchDistrictFail,
    fetchVillageFail,
    year,
    cityData,
    fetchCityFail,
    fetchCityisLoading,
  } = useSelector(getElection);
  const {
    ticketProfiles,
    partyData,
    cityOptions,
    sortedCitysTickets,
    citysProfilesObj,
  } = cityData;
  const {
    options: districtOptions,
    tickets: districtTickets,
    profiles: districtProfiles,
  } = districtData;
  const {
    options: villageOptions,
    tickets: villageTickets,
    profiles: villageProfiles,
  } = villageData;
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [village, setVillage] = useState(null);
  const [code, setCode] = useState(null);
  const [areasData, setAreasData] = useState(null);
  const [showProfiles, setShowProfiles] = useState(false);
  const [showMin, setShowMin] = useState(false);
  const dispatch = useDispatch();
  const handleReset = () => {
    setCity(null);
    setDistrict(null);
    setVillage(null);
    setCode(null);
    setAreasData(null);
    dispatch(resetData());
  };
  const handleCity = (e) => {
    setCity(e);
  };
  const handleDistrict = (e) => {
    setDistrict(e);
  };
  const handleVillage = (e) => {
    setVillage(e);
  };
  const handleShowProfiles = () => {
    setShowProfiles((prev) => !prev);
  };
  const formatData = (data) => {
    const { vote_ticket, votable_population } = data;
    const result = [
      { name: "投票數", value: vote_ticket },
      { name: "剩餘票數", value: votable_population - vote_ticket },
    ];
    return result;
  };
  const formatTickets = (data) => {
    const { invalid_ticket, valid_ticket } = data;
    const result = [
      { name: "有效票數", value: valid_ticket },
      { name: "無效票數", value: invalid_ticket },
    ];
    return result;
  };
  useEffect(() => {
    const handleRWD = () => {
      if (window.innerWidth > 960) setShowMin(false);
      else setShowMin(true);
    };
    window.addEventListener("resize", handleRWD);
    handleRWD();
    return () => {
      window.removeEventListener("resize", handleRWD);
    };
  }, []);
  useEffect(() => {
    if (city) {
      setDistrict(null);
      setVillage(null);
      setCode(city);
      setAreasData({
        tickets: sortedCitysTickets,
        totalData: formatData(citysProfilesObj[city.value]),
        totalTickets: formatTickets(citysProfilesObj[city.value]),
        profilesObj: citysProfilesObj,
      });
      dispatch(resetVillage());
      dispatch(fetchDistrict(city.value));
    }
  }, [city]);
  useEffect(() => {
    if (district && !fetchDistrictFail) {
      setVillage(null);
      setCode(district);
      setAreasData({
        tickets: districtTickets,
        totalData: districtProfiles
          ? formatData(districtProfiles[district.value])
          : [],
        totalTickets: districtProfiles
          ? formatTickets(districtProfiles[district.value])
          : [],
        profilesObj: districtProfiles,
      });
      dispatch(fetchVillage({ city: city.value, district: district.value }));
    }
  }, [district]);
  useEffect(() => {
    if (village && !fetchVillageFail) {
      setCode(village);
      setAreasData({
        tickets: villageTickets,
        totalData: villageProfiles
          ? formatData(villageProfiles[village.value])
          : [],
        totalTickets: villageProfiles
          ? formatTickets(villageProfiles[village.value])
          : [],
        profilesObj: villageProfiles,
      });
    }
  }, [village]);
  if (
    !ticketProfiles ||
    !partyData ||
    !cityOptions ||
    !sortedCitysTickets ||
    !citysProfilesObj ||
    fetchCityFail
  )
    return (
      <div className={styles.container}>
        <TabBar handleReset={handleReset} />
        {fetchCityFail && (
          <p className={styles.error}>讀取縣市資料失敗，請稍後再試！</p>
        )}
      </div>
    );
  else {
    const { vote_to_elect } = ticketProfiles[0];
    const totalTickets = formatTickets(ticketProfiles[0]);
    const totalData = formatData(ticketProfiles[0]);
    let citysColor = {};
    Object.keys(sortedCitysTickets).map((key) => {
      citysColor[key] = [...sortedCitysTickets[key]]?.sort(
        (a, b) => b.value - a.value
      )[0].party_name;
    });
    return (
      <div className={styles.container}>
        {(fetchDistrictFail || fetchVillageFail) && (
          <div className={styles.errorText}>讀取區域資料失敗，請稍後再試！</div>
        )}
        <TabBar handleReset={handleReset} />
        <div className={styles.search}>
          <div className={styles.dropDown}>
            {!fetchCityisLoading ? (
              <Select
                options={cityOptions}
                value={city?.value}
                onChange={(e) => handleCity(e)}
              />
            ) : (
              <DisabledBox />
            )}
            <div className={styles.drop}>
              {districtOptions && !fetchCityisLoading ? (
                <Select
                  options={districtOptions}
                  value={district?.value}
                  onChange={(e) => handleDistrict(e)}
                />
              ) : (
                <DisabledBox />
              )}
              {villageOptions && !fetchCityisLoading ? (
                <Select
                  options={villageOptions}
                  value={village?.value}
                  onChange={(e) => handleVillage(e)}
                />
              ) : (
                <DisabledBox />
              )}
            </div>
          </div>
          <button
            onClick={city ? handleReset : () => {}}
            className={`${city ? "" : styles.disabled}`}
          >
            <span>清除</span>
            <Rotate />
          </button>
        </div>
        <div className={styles.bottomBox}>
          <div className={styles.overview}>
            <h3 onClick={handleShowProfiles}>
              投票概況
              {showProfiles ? <Down /> : <Right />}
            </h3>
            <div
              className={`${styles.chartWrapper} ${
                !fetchCityisLoading ? styles.show : ""
              }`}
            >
              <div
                className={`${styles.totalProfiles} ${
                  showProfiles ? styles.show : ""
                }`}
              >
                <div className={styles.pieChart}>
                  <div
                    className={styles.pieWrapper}
                    style={{
                      width: showMin ? "72px" : "120px",
                      height: showMin ? "72px" : "120px",
                    }}
                  >
                    <CustomPieChart
                      data={code ? areasData.totalData : totalData}
                      colors={COLORS}
                      showMin={showMin}
                    />
                  </div>
                  <div className={styles.votingRate}>
                    <p>
                      {code
                        ? areasData.profilesObj[
                            code.value
                          ].vote_to_elect.toFixed(2)
                        : vote_to_elect.toFixed(2)}
                      %
                    </p>
                    <p>投票率</p>
                  </div>
                </div>
                <ul className={styles.profiles}>
                  <li>
                    投票數
                    <span>
                      {formatPrice(
                        code ? areasData.totalData[0].value : totalData[0].value
                      )}{" "}
                      票
                    </span>
                  </li>
                  <li>
                    無效票數
                    <span>
                      {formatPrice(
                        code
                          ? areasData.totalTickets[1].value
                          : totalTickets[1].value
                      )}{" "}
                      票
                    </span>
                  </li>
                  <li>
                    有效票數
                    <span>
                      {formatPrice(
                        code
                          ? areasData.totalTickets[0].value
                          : totalTickets[0].value
                      )}{" "}
                      票
                    </span>
                  </li>
                </ul>
              </div>
              <div
                className={`${styles.partyPieChart} ${
                  showProfiles ? styles.show : ""
                }`}
              >
                <div
                  className={styles.pieWrapper}
                  style={{
                    width: showMin ? "72px" : "120px",
                    height: showMin ? "72px" : "120px",
                  }}
                >
                  <CustomPieChart
                    data={(code
                      ? [...areasData.tickets[code.value]]
                      : [...partyData]
                    ).sort((a, b) => b.value - a.value)}
                    colors={"color"}
                    type="party"
                    showMin={showMin}
                  />
                </div>
                <ul className={styles.partyProfiles}>
                  {(code ? [...areasData.tickets[code.value]] : [...partyData])
                    .sort((a, b) => b.value - a.value)
                    .map((v, idx) => {
                      const {
                        party_name,
                        member,
                        value,
                        cand_no,
                        ticket_percent,
                      } = v;
                      return (
                        <li key={`${party_name}_${member}`}>
                          <div
                            className={styles.num}
                            style={{
                              backgroundColor: `${
                                partyColor(party_name).color
                              }`,
                            }}
                          >
                            {cand_no}
                          </div>
                          <div className={styles.party}>
                            <p>{party_name}</p>
                            <p>{member}</p>
                          </div>
                          <span
                            style={{
                              backgroundColor: `${
                                partyColor(party_name).color
                              }`,
                            }}
                          ></span>
                          <div className={styles.rate}>
                            <p>{ticket_percent} %</p>
                            <p>{formatPrice(value)} 票</p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.map}>
            <Map city={city} setCity={setCity} citysColor={citysColor} />
          </div>
          <Slider>
            <div className={`${styles.tips}`}>
              {city ? (
                <>
                  <Details area={city} areasTickets={sortedCitysTickets} />
                  {district && (
                    <Details area={district} areasTickets={districtTickets} />
                  )}
                  {village && (
                    <Details area={village} areasTickets={villageTickets} />
                  )}
                </>
              ) : (
                <>
                  <div className={styles.tip}>
                    <div className={styles.topBox}>
                      <div className={styles.icon}>
                        <Info />
                        小提示
                      </div>
                      <p>點擊選擇縣市、區、村里，可查看選舉結果</p>
                    </div>
                    <div className={styles.image}>
                      <Tip1 />
                    </div>
                  </div>
                  <div className={styles.tip}>
                    <div className={styles.topBox}>
                      <div className={styles.icon}>
                        <Info />
                        小提示
                      </div>
                      <p>點擊地圖查看縣市的選舉結果</p>
                    </div>
                    <div className={styles.image}>
                      <Tip2 />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Slider>
        </div>
      </div>
    );
  }
};

const CustomPieChart = dynamic(() => import("components/CustomPieChart"), {
  ssr: false,
  loading: () => (
    <div className={styles.loader}>
      <span className={styles.loading}></span>
    </div>
  ),
});

const Details = ({ area, areasTickets }) => {
  if (
    !areasTickets ||
    Object.keys(areasTickets).length < 1 ||
    [...areasTickets[area.value]].length < 0
  )
    return (
      <div className={`${styles.details} ${styles.error}`}>
        <p>讀取資料時發生錯誤，請稍後再試！</p>
      </div>
    );
  const sortedAreaTicktes = [...areasTickets[area.value]]?.sort(
    (a, b) => b.value - a.value
  );
  return (
    <div
      className={styles.details}
      style={partyColor(sortedAreaTicktes[0].party_name).detailColor}
    >
      <h3>{area?.area_name}</h3>
      <ul className={styles.partyProfiles}>
        {sortedAreaTicktes?.map((v, idx) => {
          const { party_name, member, value, cand_no, ticket_percent } = v;
          return (
            <li key={`${party_name}_${member}`}>
              <div
                className={styles.num}
                style={{
                  backgroundColor: `${partyColor(party_name).color}`,
                }}
              >
                {cand_no}
              </div>
              <div className={styles.party}>
                <p>{party_name}</p>
                <p>{member}</p>
              </div>
              <span
                style={{
                  backgroundColor: `${partyColor(party_name).color}`,
                }}
              ></span>
              <div className={styles.rate}>
                <p>{ticket_percent} %</p>
                <p>{formatPrice(value)} 票</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
