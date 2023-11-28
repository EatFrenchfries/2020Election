import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCity, setYear } from "store/election/actions";
import getElection from "store/election/selectors";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import styles from "./index.module.scss";

const TabBar = ({ handleReset }) => {
  const { year } = useSelector(getElection);
  const [perView, setPerView] = useState(6);
  const dispatch = useDispatch();
  let years = [2020, 2016, 2012, 2008, 2004, 2000, 1996];
  let startNo = 15;
  const handleClick = (year) => {
    dispatch(setYear(year));
    dispatch(fetchCity(year));
    handleReset();
  };
  useEffect(() => {
    const handleRWD = () => {
      if (window.innerWidth <= 720) setPerView(window.innerWidth / 210);
      else setPerView(window.innerWidth / 250);
    };
    window.addEventListener("resize", handleRWD);
    handleRWD();
    return () => {
      window.removeEventListener("resize", handleRWD);
    };
  }, []);
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={perView}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      className={styles.tabWrapper}
    >
      {years.map((tempYear, idx) => (
        <SwiperSlide key={tempYear}>
          <div
            className={`${styles.tabBar} ${
              tempYear === year ? styles.click : ""
            }`}
            onClick={() => handleClick(tempYear)}
          >
            第{startNo - idx}任 總統副總統大選
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TabBar;
