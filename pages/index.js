import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCity, setTotalCand, setYear } from "store/election/actions";

import Layout from "containers/Layout";
import Home from "containers/Home";

import {
  formatAreasProfilesObj,
  formatAreasTickets,
  formatOptions,
  formatYearToId,
  partyColor,
} from "utils";
import { elections } from "client/apiEndpoint";

const Index = (props) => {
  const {
    totalCand,
    year,
    ticketProfiles,
    partyData,
    cityOptions,
    sortedCitysTickets,
    citysProfilesObj,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTotalCand(totalCand));
    dispatch(setYear(year));
    dispatch(
      setCity({
        ticketProfiles,
        partyData,
        cityOptions,
        sortedCitysTickets,
        citysProfilesObj,
      })
    );
  }, []);
  return (
    <Layout>
      <Home {...props} />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  let returnData = { props: {} };
  let year = 2020;
  let id = formatYearToId(year);
  let code = "00_000_00_000_0000";
  let endpoints = [
    elections.ticketProfiles(id, "N", code),
    elections.partyData(id, "N", code),
    elections.areas(id, "C", code),
    elections.areasTickets(id, "C", code),
    elections.areasProfiles(id, "C", code),
  ];
  await Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
    .then(async function (results) {
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
        returnData = {
          redirect: {
            destination: "/500",
            permanent: false,
          },
        };
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
          };
        });
        let sortedCitysTickets = formatAreasTickets(totalCand, citysTickets);
        let citysProfilesObj = formatAreasProfilesObj(citysProfiles);

        returnData.props = {
          ticketProfiles,
          partyData,
          cityOptions,
          sortedCitysTickets,
          citysProfilesObj,
          totalCand,
          year,
        };
      }
    })
    .catch((reason) => {
      console.log(reason);
      returnData = {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    });
  return returnData;
};

export default Index;
